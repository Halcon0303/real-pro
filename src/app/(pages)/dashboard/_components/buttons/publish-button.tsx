"use client"

import { Send } from "lucide-react";
import dynamic from "next/dynamic";
import { useFormStatus } from "react-dom";

const Button= dynamic(() => import("@/components/ui/button").then((mod) => mod.Button))


export default function PublishBioButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={"default"}
      className={`font-bold`}
    >
      {pending ?
        "Publishing..."
        : (
          <>Publish <Send className={`ml-3 scale-90`} /></>
        )
      }
    </Button>
  )
}