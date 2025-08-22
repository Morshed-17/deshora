"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PriceSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const PriceSlider: React.FC<PriceSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  return (
    <div className="w-full ">
      <Label className="mb-2">
        Price Range: {value[0]} Tk - {value[1]} Tk
      </Label>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={onChange}
        className="w-full"
      ></Slider>
    </div>
  );
};
