import classNames from "classnames";

import { Label } from "@/components/ui/label";


export default function IntroLabel(
  { label, detail }: { label: string, detail: string }
) {
  return (
    <div>
      <Label className="text-base lg:text-lg text-muted-foreground underline">
        {label}
      </Label>

      <h1 className={classNames({
        "font-bold text-xl md:text-2xl lg:text-3xl text-gray-600": true,
      })}>
        {detail}
      </h1>
    </div>
  )
}