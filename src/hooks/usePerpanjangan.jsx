import { useEffect, useState } from "react";
import {
  getPerpanjangan,
  getDetailPerpanjangan,
  ajukanPerpanjangan,
  setujuiPerpanjangan,
  tolakPerpanjangan,
} from "../services/perpanjanganService";

export default function usePerpanjangan() {
  const [perpanjangan, setPerpanjangan] = useState([]);
  const [detailPerpanjangan, setDetailPerpanjangan] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPerpanjangan = async () => {
    try {
      setLoading(true);
      const res = await getPerpanjangan();
      setPerpanjangan(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailPerpanjangan = async (id) => {
    const res = await getDetailPerpanjangan(id);
    setDetailPerpanjangan(res.data.data);
  };

  const handleAjukanPerpanjangan = async (id) => {
    const res = await ajukanPerpanjangan(id);
    fetchPerpanjangan();
    return res.data;
  };

  const handleSetujuiPerpanjangan = async (id) => {
    const res = await setujuiPerpanjangan(id);
    fetchPerpanjangan();
    return res.data;
  };

  const handleTolakPerpanjangan = async (id) => {
    const res = await tolakPerpanjangan(id);
    fetchPerpanjangan();
    return res.data;
  };

  useEffect(() => {
    fetchPerpanjangan();
  }, []);

  return {
    perpanjangan,
    detailPerpanjangan,
    loading,
    fetchPerpanjangan,
    fetchDetailPerpanjangan,
    handleAjukanPerpanjangan,
    handleSetujuiPerpanjangan,
    handleTolakPerpanjangan,
  };
}