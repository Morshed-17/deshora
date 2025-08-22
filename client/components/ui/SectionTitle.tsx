import React from "react";

interface Props {
  children: React.ReactNode;
}

function SectionTitle({ children }: Props) {
  return (
    <div className="text-2xl font-medium md:text-2xl lg:text-4xl md:font-bold text-foreground pt-8 pb-6 text-center">
      {children}
    </div>
  );
}

export default SectionTitle;
