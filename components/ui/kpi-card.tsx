import { Card, CardContent } from "./card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KPIData } from "@/types";

interface KPICardProps {
  data: KPIData;
}

export function KPICard({ data }: KPICardProps) {
  const TrendIcon =
    data.trend === "up" ? TrendingUp : data.trend === "down" ? TrendingDown : Minus;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{data.label}</p>
            <p className="mt-2 text-3xl font-bold">{data.value}</p>
            {data.variation !== undefined && (
              <div className="mt-2 flex items-center gap-1">
                <TrendIcon
                  className={cn(
                    "h-4 w-4",
                    data.trend === "up" && "text-green-500",
                    data.trend === "down" && "text-red-500",
                    data.trend === "stable" && "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    data.trend === "up" && "text-green-500",
                    data.trend === "down" && "text-red-500",
                    data.trend === "stable" && "text-muted-foreground"
                  )}
                >
                  {data.variation > 0 ? "+" : ""}
                  {data.variation.toFixed(1)}%
                </span>
                <span className="text-sm text-muted-foreground">vs. ciclo anterior</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

