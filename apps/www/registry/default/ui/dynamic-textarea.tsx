"use client"

import * as React from "react"

import { useDebounce } from "@/lib/hooks/use-debounce"
import { cn } from "@/lib/utils"

export interface DynamicTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onResize?: (height: number) => void
  maxHeight?: number
  debounceMs?: number
}

const DynamicTextarea = React.forwardRef<
  HTMLTextAreaElement,
  DynamicTextareaProps
>(({ className, onResize, maxHeight, debounceMs = 100, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [height, setHeight] = React.useState<number>(0)

  const debouncedAdjustHeight = useDebounce(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      const newHeight = Math.min(
        Math.max(textarea.scrollHeight, 80),
        maxHeight || Infinity
      )
      textarea.style.height = `${newHeight}px`
      setHeight(newHeight)
      onResize?.(newHeight)
    }
  }, debounceMs)

  React.useEffect(() => {
    debouncedAdjustHeight()
  }, [props.value, debouncedAdjustHeight])

  React.useEffect(() => {
    window.addEventListener("resize", debouncedAdjustHeight)
    return () => window.removeEventListener("resize", debouncedAdjustHeight)
  }, [debouncedAdjustHeight])

  return (
    <textarea
      {...props}
      ref={(element) => {
        textareaRef.current = element
        if (typeof ref === "function") {
          ref(element)
        } else if (ref) {
          ref.current = element
        }
      }}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        height: height ? `${height}px` : undefined,
        ...props.style,
      }}
    />
  )
})
DynamicTextarea.displayName = "DynamicTextarea"

export { DynamicTextarea }
