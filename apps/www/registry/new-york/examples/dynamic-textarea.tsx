"use client"

import * as React from "react"

import { Button } from "../ui/button"
import { DynamicTextarea } from "../ui/dynamic-textarea"
import { Label } from "../ui/label"

export default function DynamicTextareaDemo() {
  const [value, setValue] = React.useState("")
  const [height, setHeight] = React.useState(80)

  return (
    <div className="grid w-full gap-2">
      <Label htmlFor="dynamic-textarea" className="text-base font-semibold">
        Dynamic Textarea
      </Label>
      <DynamicTextarea
        id="dynamic-textarea"
        placeholder="Type your message here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onResize={setHeight}
        maxHeight={300}
        className="text-base"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Current height: {height}px</span>
        <span>Character count: {value.length}</span>
      </div>
      <Button
        onClick={() => {
          setValue(
            "This is a long text to demonstrate the dynamic resizing capability of this textarea. As you can see, it will grow to accommodate the content, but only up to the maxHeight specified."
          )
        }}
        className="mt-2"
      >
        Fill with sample text
      </Button>
    </div>
  )
}
