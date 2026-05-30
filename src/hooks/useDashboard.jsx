import { useEffect, useState } from "react";
import {
  getDashboard,
  getEditDashboard,
  updateDashboard,
  getBukuPopuler,
  getTerlambat,
  getPermohonanPerpanjangan,
  getJatuhTempo,
} from "../services/dashboardService";

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [dashboardSetting, setDashboardSetting] = useState(null);
  const [bukuPopuler, setBukuPopuler] = useState([]);
  const [terlambat, setTerlambat] = useState([]);
  const [perpanjangan, setPerpanjangan] = useState([]);
  const [jatuhTempo, setJatuhTempo] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getDashboard();
      setDashboard(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchEditDashboard = async () => {
    const res = await getEditDashboard();
    setDashboardSetting(res.data.data);
  };

  const handleUpdateDashboard = async (data) => {
    const res = await updateDashboard(data);
    fetchEditDashboard();
    return res.data;
  };

  const fetchBukuPopuler = async () => {
    const res = await getBukuPopuler();
    setBukuPopuler(res.data.data || []);
  };

  const fetchTerlambat = async () => {
    const res = await getTerlambat();
    setTerlambat(res.data.data || []);
  };

  const fetchPermohonanPerpanjangan = async () => {
    const res = await getPermohonanPerpanjangan();
    setPerpanjangan(res.data.data || []);
  };

  const fetchJatuhTempo = async () => {
    const res = await getJatuhTempo();
    setJatuhTempo(res.data.data || []);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    dashboardSetting,
    bukuPopuler,
    terlambat,
    perpanjangan,
    jatuhTempo,
    loading,
    fetchDashboard,
    fetchEditDashboard,
    handleUpdateDashboard,
    fetchBukuPopuler,
    fetchTerlambat,
    fetchPermohonanPerpanjangan,
    fetchJatuhTempo,
  };
}