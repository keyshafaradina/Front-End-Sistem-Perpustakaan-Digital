import { useEffect, useState } from "react";
import {
  getAnggota,
  getDetailAnggota,
  registerAnggota,
  hapusAnggota,
} from "../services/anggotaService";

export default function useAnggota() {
  const [anggota, setAnggota] = useState([]);
  const [detailAnggota, setDetailAnggota] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAnggota = async () => {
    try {
      setLoading(true);
      const res = await getAnggota();
      setAnggota(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailAnggota = async (id) => {
    const res = await getDetailAnggota(id);
    setDetailAnggota(res.data.data);
  };

  const handleRegisterAnggota = async (data) => {
    await registerAnggota(data);
    fetchAnggota();
  };

  const handleHapusAnggota = async (id) => {
    await hapusAnggota(id);
    fetchAnggota();
  };

  useEffect(() => {
    fetchAnggota();
  }, []);

  return {
    anggota,
    detailAnggota,
    loading,
    fetchAnggota,
    fetchDetailAnggota,
    handleRegisterAnggota,
    handleHapusAnggota,
  };
}