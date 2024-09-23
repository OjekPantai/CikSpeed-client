import StatsCard from "@/components/elements/StatsCard";
import { Calendar, CircleCheckBig, RefreshCw } from "lucide-react";

const HomeStats = () => {
  // Placeholder data
  const totalAntrian = 10;
  const antrianProses = 5;
  const antrianSelesai = 3;

  return (
    <div className="grid md:grid-cols-3 gap-4 mt-4">
      <StatsCard
        title="Total Antrian Hari Ini"
        value={`${totalAntrian} antrian`}
        icon={Calendar}
      />
      <StatsCard
        title="Antrian Dalam Proses"
        value={`${antrianProses} antrian`}
        icon={RefreshCw}
      />
      <StatsCard
        title="Antrian Selesai"
        value={`${antrianSelesai} antrian`}
        icon={CircleCheckBig}
      />
    </div>
  );
};

export default HomeStats;
