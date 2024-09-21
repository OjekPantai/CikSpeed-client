import StatsCard from "@/components/elements/StatsCard";
import { Button } from "@/components/ui/button";
import { Activity, DollarSign, File, PlusCircle } from "lucide-react";

const HomePage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
      </section>
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Revenue"
            icon={DollarSign}
            value="$45,231.89"
            description="+20.1% from last month"
          />
          <StatsCard
            title="Total Users"
            icon={Activity}
            value="1,230"
            description="+15% from last week"
          />
          <StatsCard
            title="Total Orders"
            icon={Activity}
            value="1,230"
            description="+15% from last week"
          />
          <StatsCard
            title="Total Products"
            icon={Activity}
            value="1,230"
            description="+15% from last week"
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
