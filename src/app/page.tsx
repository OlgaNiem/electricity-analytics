import CombinedListClient from '@/components/CombinedListClient';

export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-16">
      <h1 className="text-4xl font-bold mb-8">Electricity Analytics</h1>
      <CombinedListClient />
    </main>
  );
}
