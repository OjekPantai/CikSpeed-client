import HomeStats from "@/components/fragments/home/HomeStats";

const HomePage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <section>
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </section>
      <section>
        <HomeStats />
        <div className="p-4 bg-white shadow-md rounded-lg mt-4">
          <h3 className="text-gray-600 text-sm">Estimasi Waktu Pengerjaan</h3>
          <p className="text-xl font-semibold">15 menit</p>
        </div>
      </section>

      <section></section>
    </main>
  );
};

export default HomePage;
