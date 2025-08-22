"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export function SearchBox() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const matched =
    value && (value.toLowerCase() === "soccer" || value === "サッカー");

  const handleClear = () => {
    setValue("");
  };

  const handleEnter = () => {
    if (matched) {
      handleClear();
      router.push("/soccer/rankTable");
    }
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Sports検索..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleEnter();
        }}
        className="w-full rounded-full border border-gray-900 py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-900" />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}

      {value && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {matched ? (
            <li
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={handleEnter}
            >
              サッカー (soccer)
            </li>
          ) : (
            <>
              <li className="px-4 py-2 text-sm text-gray-500">
                候補がありません
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}
