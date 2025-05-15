import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#f4f6fa] text-primary hover:bg-[#f4f6fa]/80",
        secondary:
          "border-transparent bg-[#f4f6fa] text-secondary-foreground hover:bg-[#f4f6fa]/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        anomaly: "border-transparent bg-risk-red text-white hover:bg-risk-red/90",
        "non-anomaly": "border-transparent bg-normal-green text-white hover:bg-normal-green/90",
        risk: "border-transparent bg-risk-red text-white hover:bg-risk-red/90",
        normal: "border-transparent bg-normal-green text-white hover:bg-normal-green/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
