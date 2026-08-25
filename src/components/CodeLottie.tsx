"use client"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export default function CodeLottie() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <DotLottieReact src="/lottie/code-dark.lottie" autoplay loop style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
