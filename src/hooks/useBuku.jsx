import { useEffect, useState } from "react";
import {
  getBuku,
  tambahBuku,
  updateBuku,
  hapusBuku,
  arsipkanBuku,
  getBukuArsip,
  bukaArsipBuku,
  hapuskanBuku,
  getBukuDihapus,
  pulihkanBuku,
} from "../services/bukuService";

export default function useBuku() {
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBuku = async () => {
    try {
      setLoading(true);
      const res = await getBuku();
      setBuku(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleTambahBuku = async (data) => {
    await tambahBuku(data);
    fetchBuku();
  };

  const handleUpdateBuku = async (id, data) => {
    await updateBuku(id, data);
    fetchBuku();
  };

  const handleHapusBuku = async (id) => {
    await hapusBuku(id);
    fetchBuku();
  };

  const handleArsipkanBuku = async (id) => {
    await arsipkanBuku(id);
    fetchBuku();
  };

  const fetchBukuArsip = async () => {
    const res = await getBukuArsip();
    setBuku(res.data.data || []);
  };

  const handleBukaArsipBuku = async (id) => {
    await bukaArsipBuku(id);
    fetchBukuArsip();
  };

  const handleHapuskanBuku = async (id) => {
    await hapuskanBuku(id);
    fetchBuku();
  };

  const fetchBukuDihapus = async () => {
    const res = await getBukuDihapus();
    setBuku(res.data.data || []);
  };

  const handlePulihkanBuku = async (id) => {
    await pulihkanBuku(id);
    fetchBukuDihapus();
  };

  useEffect(() => {
    fetchBuku();
  }, []);

  return {
    buku,
    loading,
    fetchBuku,
    handleTambahBuku,
    handleUpdateBuku,
    handleHapusBuku,
    handleArsipkanBuku,
    fetchBukuArsip,
    handleBukaArsipBuku,
    handleHapuskanBuku,
    fetchBukuDihapus,
    handlePulihkanBuku,
  };
}