export function generateSKU(title: string): string {
  const cleanTitle = title.replace(/\s+/g, "").toUpperCase();

  const now = new Date();
  const yy = now.getFullYear().toString().slice(2);
  const mm = (now.getMonth() + 1).toString().padStart(2, "0");
  const dd = now.getDate().toString().padStart(2, "0");
  const datePart = `${yy}${mm}${dd}`;

  const randomPart = Math.floor(1000 + Math.random() * 9000);

  return `${cleanTitle}-${datePart}-${randomPart}`;
}
