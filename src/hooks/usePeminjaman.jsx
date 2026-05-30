import { useEffect, useState } from "react";
import {
  getPeminjaman,
  scanAnggota,
  cariBuku,
  simpanPeminjaman,
  kembalikanBuku,
  batalPeminjaman,
} from "../services/peminjamanService";

export default function usePeminjaman() {
  const [peminjaman, setPeminjaman] = useState([]);
  const [anggotaScan, setAnggotaScan] = useState(null);
  const [bukuCari, setBukuCari] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPeminjaman = async () => {
    try {
      setLoading(true);
      const res = await getPeminjaman();
      setPeminjaman(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleScanAnggota = async (data) => {
    const res = await scanAnggota(data);
    setAnggotaScan(res.data.data);
    return res.data;
  };

  const handleCariBuku = async (data) => {
    const res = await cariBuku(data);
    setBukuCari(res.data.data);
    return res.data;
  };

  const handleSimpanPeminjaman = async (data) => {
    const res = await simpanPeminjaman(data);
    fetchPeminjaman();
    return res.data;
  };

  const handleKembalikanBuku = async (id, data) => {
    const res = await kembalikanBuku(id, data);
    fetchPeminjaman();
    return res.data;
  };

  const handleBatalPeminjaman = async () => {
    const res = await batalPeminjaman();
    return res.data;
  };

  useEffect(() => {
    fetchPeminjaman();
  }, []);

  return {
    peminjaman,
    anggotaScan,
    bukuCari,
    loading,
    fetchPeminjaman,
    handleScanAnggota,
    handleCariBuku,
    handleSimpanPeminjaman,
    handleKembalikanBuku,
    handleBatalPeminjaman,
  };
}