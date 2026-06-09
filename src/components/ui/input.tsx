import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 border border-input bg-white px-3 py-2 text-base transition-[border-color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-[#A8A29E] focus-visible:border-primary focus-visible:border-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border disabled:bg-[#F5F5F4] disabled:opacity-50 aria-invalid:border-destructive aria-invalid:border-2 aria-invalid:bg-[#FEF2F2] md:text-base",
        className
      )}
      {...props}
    />
  )
}

export { Input }
