import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import React from "react";

function NoProductFound() {
  return (
    <Card className="flex flex-col items-center justify-center text-center py-16 px-6 shadow-none border-none">
      <CardContent className="flex flex-col items-center gap-4">
        {/* Icon */}

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground">
          No Products Found
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground max-w-md">
          We couldn’t find any products matching your filters. Try adjusting the
          categories or sorting options.
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/shop")}
          >
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoProductFound;
