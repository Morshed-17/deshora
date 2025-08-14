import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header";
import React, { ReactNode } from "react";

function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default CommonLayout;
