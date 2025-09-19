"use client";

import { useEffect, useState } from "react";
import { MainNav } from "./main-nav";
import { SearchBox } from "./search-box";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // ページ最上部にいるときは必ず表示
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // 下にスクロール中は非表示
        setShowHeader(false);
      } else {
        // 上にスクロール中は表示
        setShowHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 border-b border-gray-300 bg-white/70 backdrop-blur-sm text-gray-800 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <div className="flex items-center">
          <SearchBox />
        </div>
        <MainNav />
      </div>
    </header>
  );
}
