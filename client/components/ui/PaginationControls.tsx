"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect } from "react";

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface PaginationControlsProps {
  meta: Meta;
  page: number;
  setPage: (page: number) => void;
}

export default function PaginationControls({
  meta,
  page,
  setPage,
}: PaginationControlsProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);
  if (!meta) return null;

  const pages = Array.from({ length: meta.totalPage }, (_, i) => i + 1);

  const handlePageClick = (p: number) => {
    if (p !== page) setPage(p);
  };



  return (
    <Pagination className="my-12">
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && setPage(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === page}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(p);
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => page < meta.totalPage && setPage(page + 1)}
            className={
              page === meta.totalPage ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
