import { useState } from "react";
import {
  getLaporanKunjungan,
  getLaporanPeminjaman,
  getLaporanPengembalian,
} from "../services/laporanService";

export default function useLaporan() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLaporanKunjungan = async (params = {}) => {
    try {
      setLoading(true);
      const res = await getLaporanKunjungan(params);
      setLaporan(res.data.data || []);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const fetchLaporanPeminjaman = async (params = {}) => {
    try {
      setLoading(true);
      const res = await getLaporanPeminjaman(params);
      setLaporan(res.data.data || []);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const fetchLaporanPengembalian = async (params = {}) => {
    try {
      setLoading(true);
      const res = await getLaporanPengembalian(params);
      setLaporan(res.data.data || []);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    laporan,
    loading,
    fetchLaporanKunjungan,
    fetchLaporanPeminjaman,
    fetchLaporanPengembalian,
  };
}