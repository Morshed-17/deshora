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

  const updateSize = (index: number, field: keyof SizeType, val: string) => {
    const newSizes = [...sizes];

    if (field === "stock") {
      // allow empty string in input
      newSizes[index][field] = val === "" ? ("" as any) : Number(val);
    } else {
      newSizes[index][field] = val as any;
    }

    setSizes(newSizes);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="font-semibold mb-2 block">Sizes & Stock</label>
      {sizes.map((sizeData, index) => (
        <div key={index} className="flex gap-2 mb-2 items-center ">
          <FormItem>
            <FormLabel>Size</FormLabel>
            <FormControl>
              <Input
                placeholder="Size (e.g. M, L, 42)"
                value={sizeData.size}
                onChange={(e) => updateSize(index, "size", e.target.value)}
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Stock</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Stock"
                value={sizeData.stock === 0 ? "" : sizeData.stock} // show empty if 0
                onChange={(e) => updateSize(index, "stock", e.target.value)}
              />
            </FormControl>
          </FormItem>

          <Button
            variant="ghost"
            onClick={() => removeSize(index)}
            className="mt-5"
            type="button"
          >
            Delete
          </Button>
        </div>
      ))}

      <Button
        onClick={addSize}
        className="mt-2"
        variant={"secondary"}
        type="button"
      >
        + Add Size
      </Button>
    </div>
  );
}
