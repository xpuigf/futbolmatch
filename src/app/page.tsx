import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="size-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
          <span className="text-3xl text-primary-foreground">⚽</span>
        </div>
        <h1 className="text-3xl font-bold">FutbolMatch Manager</h1>
        <p className="text-muted-foreground">
          Gestiona els partits, confirma assistències i controla la tresoreria
          del grup.
        </p>
        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="block w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium text-center hover:opacity-90 transition-opacity"
          >
            Inicia sessió
          </Link>
        </div>
      </div>
    </main>
  );
}