import { useState } from "react";

function Buku() {
  const [buku, setBuku] = useState([]);
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [editId, setEditId] = useState(null);

  // CREATE + UPDATE
  const handleSimpan = () => {
    if (!judul || !penulis) return;

    if (editId) {
      // UPDATE
      const dataBaru = buku.map((item) =>
        item.id === editId
          ? { ...item, judul, penulis }
          : item
      );

      setBuku(dataBaru);
      setEditId(null);
    } else {
      // CREATE
      const dataBaru = {
        id: Date.now(),
        judul,
        penulis,
      };

      setBuku([...buku, dataBaru]);
    }

    setJudul("");
    setPenulis("");
  };

  // DELETE
  const handleHapus = (id) => {
    const dataBaru = buku.filter((item) => item.id !== id);
    setBuku(dataBaru);
  };

  // EDIT (ambil data ke input)
  const handleEdit = (item) => {
    setEditId(item.id);
    setJudul(item.judul);
    setPenulis(item.penulis);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Data Buku</h1>

      {/* FORM INPUT */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Judul Buku"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />

        <input
          type="text"
          placeholder="Penulis"
          value={penulis}
          onChange={(e) => setPenulis(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button onClick={handleSimpan} style={{ marginLeft: "10px" }}>
          {editId ? "Simpan Perubahan" : "Tambah Buku"}
        </button>
      </div>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {buku.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">
                Belum ada data
              </td>
            </tr>
          ) : (
            buku.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.judul}</td>
                <td>{item.penulis}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleHapus(item.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Buku;