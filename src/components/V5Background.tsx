"use client"
import { useEffect, useRef } from "react"
export default function V5Background() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const pos = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ]
  useEffect(() => {
    let cur = 0
    let id = 0
    const onScroll = () => {
      const ns = window.pageYOffset
      cur = ns
      refs.current.forEach((el, i) => {
        if (!el) return
        const p = pos[i]
        const x = p.x + Math.sin(ns / 100 + i * 0.5) * 220
        const y = p.y + Math.cos(ns / 100 + i * 0.5) * 30
        el.style.transform = `translate(${x}px,${y}px)`
        el.style.transition = "transform 1.4s ease-out"
      })
      id = requestAnimationFrame(onScroll)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(id)
    }
  }, [])
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0">
        <div ref={(r) => { refs.current[0] = r }} className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-[#068e75] rounded-full filter blur-[128px] opacity-40 md:opacity-25" />
        <div ref={(r) => { refs.current[1] = r }} className="absolute top-0 -right-4 w-96 h-96 bg-[#10b981] rounded-full filter blur-[128px] opacity-40 md:opacity-25 hidden sm:block" />
        <div ref={(r) => { refs.current[2] = r }} className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-[#068e75] rounded-full filter blur-[128px] opacity-35 md:opacity-20" />
        <div ref={(r) => { refs.current[3] = r }} className="absolute -bottom-10 right-20 w-96 h-96 bg-[#34d399] rounded-full filter blur-[128px] opacity-30 md:opacity-15 hidden sm:block" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  )
}
