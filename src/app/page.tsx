import CombinedList from '@/components/CombinedList';

export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-16 flex flex-col gap-10">
      <h1 className="text-4xl font-bold">Electricity Analytics for Vaasa</h1>
      <CombinedList />
    </main>
  );
}
