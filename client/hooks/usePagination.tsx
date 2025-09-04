"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function usePagination(defaultLimit: number = 12) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(defaultLimit);

  // Restore from URL
  useEffect(() => {
    const urlPage = Number(searchParams.get("page") || 1);
    const urlLimit = Number(searchParams.get("limit") || defaultLimit);

    setPage(urlPage);
    setLimit(urlLimit);
  }, [searchParams, defaultLimit]);

  // Sync to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));
    params.set("limit", String(limit));

    router.replace(`?${params.toString()}`, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, router]);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(1, prev - 1));
  const resetPage = () => setPage(1);

  return {
    page,
    setPage,
    limit,
    setLimit,
    nextPage,
    prevPage,
    resetPage,
  };
}
