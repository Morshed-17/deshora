export const calculateDeliveryCharge = (deliveryZone: string) => {
  if (deliveryZone === "inside-dhaka") {
    return 80;
  } else {
    return 120;
  }
};
