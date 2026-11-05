# AtmaLibrary

Platform perpustakaan digital untuk pengelolaan katalog buku, peminjaman, dan pengembalian. Project ini terdiri dari:

- **Backend**: Laravel REST API + MySQL
- **Web**: React + Vite

Project ini digunakan untuk alur admin perpustakaan dan anggota.

## Arsitektur

```text
Web (React/Vite) --> Laravel API --> MySQL
```

## Struktur Repository

```text
Backend/   Laravel API, model, controller, migration, seeder
Frontend/  Aplikasi web React + Vite
README.md  Dokumentasi proyek
```

## Fitur Utama

### Web

- **Publik**: landing page, daftar buku populer, buku terbaru, login, dan register
- **Admin**: dashboard peminjaman, persetujuan/penolakan pinjaman, pengembalian buku, kelola buku (tambah, edit, hapus, cover, stok), daftar pengembalian, detail denda, pencarian user
- **Anggota**: home katalog, filter kategori, detail buku, pengajuan peminjaman (7 hari), daftar buku pinjaman, profil (nama, alamat, foto, password), logout

### Keamanan & Otorisasi

- Autentikasi menggunakan **Laravel Sanctum** (Bearer Token)
- Role yang tersedia: `admin` dan `anggota`
- Registrasi publik hanya dapat membuat akun `anggota`
- Endpoint admin dilindungi `auth:sanctum` serta pemeriksaan role `admin` pada middleware/controller
- Anggota hanya dapat mengakses data peminjaman dan pengembalian miliknya sendiri
- Logout menghapus seluruh token aktif milik user

## Prasyarat

- PHP 8.2+ dan Composer (diuji dengan PHP 8.4.27)
- MySQL 8.x atau MariaDB (Laragon)
- Node.js 18+ dan npm (diuji dengan Node.js 24)
- Google Chrome (opsional, untuk pengujian browser)

> Catatan: XAMPP dan Laragon sama-sama menggunakan port `3306`. Pastikan hanya satu server MySQL yang aktif.

## Setup

### 1. Backend

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
```

Di Windows PowerShell, perintah salin dapat menggunakan:

```powershell
Copy-Item .env.example .env
```

Sesuaikan `.env` untuk MySQL:

```env
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_library
DB_USERNAME=root
DB_PASSWORD=

CACHE_STORE=file
QUEUE_CONNECTION=sync
```

`CACHE_STORE=file` dan `QUEUE_CONNECTION=sync` diperlukan agar aplikasi dapat berjalan tanpa tabel cache/queue tambahan.

Siapkan database dengan salah satu opsi berikut.

Opsi 1 - impor dump database yang sudah ada:

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS db_library CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"
mysql -u root db_library < db_library.sql
```

Opsi 2 - buat database baru dari migration:

```bash
php artisan migrate
```

Akun demo di bawah ini tersedia jika menggunakan data database `db_library` dari dump tersebut.

Aktifkan penyimpanan file publik untuk cover buku dan foto profil:

```bash
php artisan storage:link
```

Jalankan API:

```bash
php artisan serve --host=127.0.0.1 --port=8000
```

API tersedia di `http://127.0.0.1:8000/api`.

### 2. Web

```bash
cd Frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Web tersedia di `http://127.0.0.1:5173`.

Base URL API saat ini diatur ke `http://127.0.0.1:8000/api` pada `src/api/index.jsx` dan beberapa file di `src/api/`. CORS backend mengizinkan origin `http://localhost:5173` dan `http://127.0.0.1:5173`.

## Akun Demo

Password semua akun demo: `password`.

| Role | Email | Password |
|---|---|---|
| Admin | admin@gmail.com | password |
| Anggota | vince@example.com | password |

Gunakan akun ini hanya untuk local/UAT.

## Menjalankan Aplikasi

1. Aktifkan MySQL dari Laragon.
2. Jalankan backend di `http://127.0.0.1:8000`.
3. Jalankan web di `http://127.0.0.1:5173`.
4. Login menggunakan akun demo sesuai role.

## Pengujian

### Backend

```bash
cd Backend
php artisan test
```

### Build Web

```bash
cd Frontend
npm run build
```

### Checklist E2E Manual

1. Landing page menampilkan bagian **New Arrivals** dan **Popular Books**.
2. Login admin diarahkan ke `/HomeAdmin`.
3. Admin dapat membuka `/BookAdmin`, menambah/mengubah buku, serta melihat `/Returning`.
4. Admin dapat menyetujui (`borrowed`), menolak (`declined`), dan menandai pinjaman sebagai kembali (`returned`).
5. Login anggota diarahkan ke `/HomePage`.
6. Anggota dapat membuka kategori, detail buku, mengajukan peminjaman, dan melihat `/myBooks`.
7. Anggota dapat membuka dan memperbarui `/profile`.
8. Logout menghapus token; akses endpoint terproteksi tanpa token mengembalikan `401`.
9. Akses endpoint admin dengan token anggota mengembalikan `403`.
10. Request validasi yang salah mengembalikan `422`.

## Hasil Pengujian Terakhir

Per 2026-11-05:

| Suite | Hasil |
|---|---|
| API E2E | 45/45 PASS |
| Browser E2E (Chrome + Playwright) | 29/29 PASS |
| Build web (`npm run build`) | Berhasil |
| `CHECK TABLE` database | 7/7 OK |
| Log Laravel | Tidak ada ERROR/CRITICAL |

Pengujian tulis dilakukan terhadap salinan database `db_library_e2e`, sehingga database asli `db_library` tidak berubah. Salinan database tersebut sudah dihapus setelah pengujian.

## Catatan

- Status peminjaman: `pending`, `borrowed`, `declined`, `returned`.
- Denda keterlambatan dihitung Rp50.000 per hari.
- Durasi peminjaman default dari frontend adalah 7 hari.
- Perubahan skema terakhir menambahkan status `declined` pada enum `peminjaman.status`.
