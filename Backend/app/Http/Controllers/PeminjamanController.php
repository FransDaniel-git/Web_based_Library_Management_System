<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use App\Models\Buku;
use App\Models\Pengembalian;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PeminjamanController extends Controller
{
    public function index()
    {
        if (auth()->user()->role === 'anggota') {
            $peminjaman = Peminjaman::where('id_user', auth()->id())
                ->with(['buku', 'user'])
                ->get();
            return response()->json($peminjaman);
        }

        $peminjaman = Peminjaman::with(['buku', 'user'])->get();
        return response()->json($peminjaman);
    }

    public function store(Request $request)
    {
        // Validation errors should return 422, so validate before the try block.
        $validated = $request->validate([
            'id_user' => 'required|integer|exists:users,id_user',
            'id_buku' => 'required|integer|exists:buku,id_buku',
            'tgl_pinjam' => 'required|date',
            'tgl_kembali' => 'nullable|date',
            'status' => 'required|string|in:pending,borrowed,declined,returned',
        ]);

        // Members may only create loans for themselves.
        if (auth()->user()->role !== 'admin' && (int) $validated['id_user'] !== (int) auth()->id()) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        // Members cannot self-approve; new requests always start as pending.
        if (auth()->user()->role !== 'admin') {
            $validated['status'] = 'pending';
        }

        try {
            DB::beginTransaction();

            $peminjaman = Peminjaman::create($validated);

            DB::commit();

            return response()->json($peminjaman, 201);
        } catch (\Exception $e) {
            DB::rollBack();

            \Log::error('Error in store method:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);

        // Anggota can only view their own loans
        if (auth()->user()->role === 'anggota' && $peminjaman->id_user !== auth()->id()) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        return response()->json($peminjaman);
    }

    public function update(Request $request, $id)
    {
        // Only admin can update a loan
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        // Validate only the 'status' field
        $validated = $request->validate([
            'status' => 'required|string|in:pending,borrowed,declined,returned',
        ]);

        // Find the loan by ID
        $peminjaman = Peminjaman::findOrFail($id);

        // Start a transaction to ensure data consistency
        DB::beginTransaction();

        try {
            // If status is being updated to 'borrowed', adjust the book stock
            if ($validated['status'] === 'borrowed' && $peminjaman->status !== 'borrowed') {
                $buku = Buku::findOrFail($peminjaman->id_buku);

                // Ensure there is stock available
                if ($buku->stok <= 0) {
                    return response()->json(['message' => 'Book is out of stock'], 400);
                }

                $buku->decrement('stok', 1); // Decrease stock by 1
                $buku->increment('jml_pinjam', 1); // Increase borrow count by 1
            }

            // When marking a loan as returned, restore stock once and record pengembalian
            if ($validated['status'] === 'returned' && $peminjaman->status !== 'returned') {
                $buku = Buku::findOrFail($peminjaman->id_buku);

                // Only a loan that was actually borrowed should return stock.
                if ($peminjaman->status === 'borrowed') {
                    $buku->increment('stok', 1); // Book comes back to inventory
                }

                // Hitung denda keterlambatan dan pastikan tidak pernah negatif
                $overdueDays = 0;
                if ($peminjaman->tgl_kembali) {
                    $overdueDays = Carbon::parse($peminjaman->tgl_kembali)
                        ->diffInDays(Carbon::now(), false); // signed diff
                    $overdueDays = max(0, $overdueDays); // clamp to zero
                }
                $denda = $overdueDays * 50000;

                // Catat pengembalian (hindari duplikasi per id_pinjam)
                Pengembalian::updateOrCreate(
                    ['id_pinjam' => $peminjaman->id_pinjam],
                    [
                        'id_user'   => $peminjaman->id_user,
                        'tgl_pinjam'=> $peminjaman->tgl_pinjam,
                        'jml_denda' => $denda,
                    ]
                );
            }

            // Update the 'status' field
            $peminjaman->update(['status' => $validated['status']]);

            DB::commit();

            return response()->json([
                'message' => 'Loan status updated successfully',
                'data' => $peminjaman,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error updating loan', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        // Only admin can delete a loan
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->delete();
        return response()->json(['message' => 'Loan deleted successfully']);
    }

    public function getByUser ($id_user)
    {
        // Allow admin to view any user; anggota can only see their own loans
        if (auth()->user()->role !== 'admin' && auth()->id() !== (int)$id_user) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $peminjaman = Peminjaman::where('id_user', $id_user)
            ->whereIn('status', ['pending', 'borrowed', 'returned'])
            ->with('Buku')
            ->get()
            ->map(function ($item) {
                // Check if this peminjaman has a pengembalian record
                $pengembalian = Pengembalian::where('id_pinjam', $item->id_pinjam)->first();
                $item->status_pengembalian = $pengembalian ? true : false;
                $item->pengembalian = $pengembalian;
                return $item;
            });

        return response()->json($peminjaman);
    }

    public function checkUserBook(Request $request)
    {
        $validated = $request->validate([
            'id_user' => 'required|integer|exists:users,id_user',
            'id_buku' => 'required|integer|exists:buku,id_buku',
        ]);
    
        $peminjaman = Peminjaman::where('id_user', $validated['id_user'])
            ->where('id_buku', $validated['id_buku'])
            ->where('status', '!=', 'returned') // Check for active loans (not returned)
            ->first();
    
        if ($peminjaman) {
            return response()->json(['borrowed' => true, 'status' => $peminjaman->status]);
        }
    
        return response()->json(['borrowed' => false, 'status' => null]);
    }
}
