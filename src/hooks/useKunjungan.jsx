import { useState } from "react";
import { simpanKunjungan } from "../services/kunjunganService";

export default function useKunjungan() {
  const [loading, setLoading] = useState(false);

  const handleSimpanKunjungan = async (data) => {
    try {
      setLoading(true);
      const res = await simpanKunjungan(data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSimpanKunjungan,
  };
}