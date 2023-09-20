import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl text-center">
        Welcome to <span className="font-bold ">Northern Labs</span>&apos; EVM
        Blockchain Explorer
      </h1>
      <Link
        href="/address"
        className="mt-8 px-6 py-3 bg-gray-500 text-white text-lg font-bold rounded-full"
      >
        Get Started
      </Link>
    </main>
  );
}
