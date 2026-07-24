import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="size-16 bg-[#C00000] rounded flex items-center justify-center mx-auto">
          <span className="text-3xl text-white">⚽</span>
        </div>
        <h1 className="text-3xl font-bold text-[#333333]">FutbolMatch Manager</h1>
        <p className="text-[#666666]">
          Gestiona els partits, confirma assistències i controla la tresoreria
          del grup.
        </p>
        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="block w-full py-3 px-6 bg-[#C00000] text-white rounded font-medium text-center hover:bg-[#990000] transition-colors"
          >
            Inicia sessió
          </Link>
        </div>
      </div>
    </main>
  );
}