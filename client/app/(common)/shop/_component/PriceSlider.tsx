"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";

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
