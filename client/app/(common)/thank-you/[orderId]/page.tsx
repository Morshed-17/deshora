import React from "react";

async function ThankyouPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return <div>ThankyouPage {orderId}</div>;
}

export default ThankyouPage;
