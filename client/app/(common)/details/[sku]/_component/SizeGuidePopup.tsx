import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Ruler } from "lucide-react";
import React from "react";

function SizeGuidePopup() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <p className="flex items-center gap-1 underline font-medium cursor-pointer">
            <Ruler size={16} /> Size Guide
          </p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg w-full rounded-2xl p-6">
          <AlertDialogHeader>
            <DialogTitle className="text-primary">Size Guide</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Find your perfect fit with our detailed size guide. Measurements
              are in centimeters (cm).
            </DialogDescription>
          </AlertDialogHeader>

          <div className="mt-4 space-y-6">
            <section>
              <h3 className="text-muted-foreground font-semibold mb-2">
                Women's Sizes
              </h3>
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-muted text-muted-foreground">
                    <th className="py-2 px-3">Size</th>
                    <th className="py-2 px-3">Bust</th>
                    <th className="py-2 px-3">Waist</th>
                    <th className="py-2 px-3">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-muted/50">
                    <td className="py-2 px-3">S</td>
                    <td className="py-2 px-3">84-88</td>
                    <td className="py-2 px-3">66-70</td>
                    <td className="py-2 px-3">90-94</td>
                  </tr>
                  <tr className="border-t border-muted/50">
                    <td className="py-2 px-3">M</td>
                    <td className="py-2 px-3">89-93</td>
                    <td className="py-2 px-3">71-75</td>
                    <td className="py-2 px-3">95-99</td>
                  </tr>
                  <tr className="border-t border-muted/50">
                    <td className="py-2 px-3">L</td>
                    <td className="py-2 px-3">94-98</td>
                    <td className="py-2 px-3">76-80</td>
                    <td className="py-2 px-3">100-104</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h3 className="text-muted-foreground font-semibold mb-2">
                Men's Sizes
              </h3>
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-muted text-muted-foreground">
                    <th className="py-2 px-3">Size</th>
                    <th className="py-2 px-3">Chest</th>
                    <th className="py-2 px-3">Waist</th>
                    <th className="py-2 px-3">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-muted/50">
                    <td className="py-2 px-3">S</td>
                    <td className="py-2 px-3">88-92</td>
                    <td className="py-2 px-3">74-78</td>
                    <td className="py-2 px-3">90-94</td>
                  </tr>
                  <tr className="border-t border-muted/50">
                    <td className="py-2 px-3">M</td>
                    <td className="py-2 px-3">93-97</td>
                    <td className="py-2 px-3">79-83</td>
                    <td className="py-2 px-3">95-99</td>
                  </tr>
                  <tr className="border-t border-muted/50">
                    <td className="py-2 px-3">L</td>
                    <td className="py-2 px-3">98-102</td>
                    <td className="py-2 px-3">84-88</td>
                    <td className="py-2 px-3">100-104</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <p className="text-muted-foreground text-sm">
              Tip: Measure yourself accurately and compare with the table to
              select the best fit. If you are between sizes, we recommend
              choosing the larger size for comfort.
            </p>
          </div>

          <div className="mt-6 text-right">
            <DialogClose asChild>
              <Button variant="destructive">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SizeGuidePopup;
