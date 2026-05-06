import React from "react";

const DashboardAdmin = () => {
  const books = [
    { id: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata" },
    { id: 2, judul: "Bumi", penulis: "Tere Liye" },
    { id: 3, judul: "Negeri 5 Menara", penulis: "Ahmad Fuadi" },
    { id: 4, judul: "Dilan 1990", penulis: "Pidi Baiq" },
    { id: 5, judul: "Ayat-Ayat Cinta", penulis: "Habiburrahman" },
    { id: 6, judul: "Perahu Kertas", penulis: "Dee Lestari" },
  ];

  // Mengambil 3 buku pertama untuk ditampilkan
  const limitedBooks = books.slice(0, 3);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ background: "#e8a1c4", padding: "15px", color: "#000" }}>
        <h2>☰ E - Library</h2>
        <p>Sistem Informasi Perpustakaan Digital</p>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "20px" }}>
        <h3>Selamat datang, Admin!</h3>
        <p>Kelola perpustakaan dengan mudah hari ini</p>

        {/* CARD */}
        <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
          <div style={{ background: "#f3b3d1", padding: "10px", borderRadius: "5px" }}>500 Buku</div>
          <div style={{ background: "#f3b3d1", padding: "10px", borderRadius: "5px" }}>350 Anggota</div>
          <div style={{ background: "#f3b3d1", padding: "10px", borderRadius: "5px" }}>120 Dipinjam</div>
        </div>

        {/* LIST BUKU */}
        <h3>Buku Terbaru</h3>

        <p>Total buku: {books.length}</p>
        <p>Ditampilkan: {limitedBooks.length}</p>

        {limitedBooks.map((book) => (
          <div key={book.id} style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px"
          }}>
            <h4>{book.judul}</h4>
            <p>Penulis: {book.penulis}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdmin;