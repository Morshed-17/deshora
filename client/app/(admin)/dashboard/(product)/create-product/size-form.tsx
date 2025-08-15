import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type SizeType = {
  size: string;
  stock: number;
};

interface SizesFormProps {
  value?: SizeType[];
  onChange?: (sizes: SizeType[]) => void;
}

export default function SizesForm({ value = [], onChange }: SizesFormProps) {
  const [sizes, setSizes] = useState<SizeType[]>(
    Array.isArray(value) ? value : []
  );



  useEffect(() => {
    onChange?.(sizes);
  }, [sizes, onChange]);

  const addSize = () => setSizes([...sizes, { size: "", stock: 0 }]);

  const updateSize = (
    index: number,
    field: keyof SizeType,
    val: string | number
  ) => {
    const newSizes = [...sizes];

    newSizes[index][field] =
      field === "stock" ? (Number(val) as never) : (String(val) as never);
    setSizes(newSizes);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="font-semibold mb-2 block">Sizes & Stock</label>
      {sizes.map((s, i) => (
        <div key={i} className="flex gap-2 mb-2 items-center ">
          <FormItem>
            <FormLabel>Size</FormLabel>
            <FormControl>
              <Input
                placeholder="Size (e.g. M, L, 42)"
                value={s.size}
                onChange={(e) => updateSize(i, "size", e.target.value)}
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Stock</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Stock"
                value={s.stock}
                onChange={(e) => updateSize(i, "stock", e.target.value)}
              />
            </FormControl>
          </FormItem>

          <Button
            variant="ghost"
            onClick={() => removeSize(i)}
            className="mt-5"
          >
            Delete
          </Button>
        </div>
      ))}

      <Button onClick={addSize} className="mt-2" variant={"secondary"}>
        + Add Size
      </Button>
    </div>
  );
}
