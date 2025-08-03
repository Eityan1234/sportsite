"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('#')", // 背景画像を入れる
      }}
    >
      <div className="bg-black/60 min-h-screen flex flex-col items-center justify-center px-4">
        <main className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Sports Information Medium
          </h1>

          <section className="mt-6 sm:mt-10 max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl text-gray-200 drop-shadow-sm">
              ※このアプリは、サッカー・バスケットボールの試合速報を中心に、スポーツ情報をAPIで提供します。
            </p>
          </section>
          <section className="mt-12 flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={() => handleNavigation("#")}
              className="w-64 py-4 text-lg font-semibold bg-slate-700 hover:bg-slate-600 text-white rounded-full shadow-md transition"
            >
              サッカー
            </button>

            <button
              type="button"
              onClick={() => handleNavigation("#")}
              className="w-64 py-4 text-lg font-semibold bg-slate-700 hover:bg-slate-600 text-white rounded-full shadow-md transition"
            >
              バスケットボール
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
