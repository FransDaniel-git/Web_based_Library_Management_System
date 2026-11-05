<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Extend the loan status enum so the admin "decline" action can be stored.
     */
    public function up()
    {
        DB::statement("ALTER TABLE peminjaman MODIFY COLUMN status ENUM('borrowed', 'returned', 'pending', 'declined') NOT NULL DEFAULT 'pending'");
    }

    public function down()
    {
        DB::table('peminjaman')->where('status', 'declined')->update(['status' => 'pending']);

        DB::statement("ALTER TABLE peminjaman MODIFY COLUMN status ENUM('borrowed', 'returned', 'pending') NOT NULL DEFAULT 'pending'");
    }
};
