import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, User, GitBranch, Globe } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"


const Typewriter = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState("")
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i))
        i++
      } else clearInterval(id)
    }, 130)
    return () => clearInterval(id)
  }, [text])
  return (
    <span className="inline-flex items-center">
      {display}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  )
}

const Bg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
  </div>
)

const IconBtn = ({ Icon }: { Icon: any }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="relative p-2 sm:p-3 bg-white/[0.06] backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white/80" />
    </div>
  </div>
)

export default function WelcomeScreen() {
  const [loading, setLoading] = useState(true)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("welcome-seen")) {
      setLoading(false)
      setGone(true)
      return
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoading(false)
      setGone(true)
      if (typeof window !== "undefined") sessionStorage.setItem("welcome-seen", "1")
      return
    }
    AOS.init({ duration: 1000, once: false, mirror: false })
    document.body.style.overflow = "hidden"
    const t = setTimeout(() => {
      setLoading(false)
      setTimeout(() => {
        setGone(true)
        document.body.style.overflow = ""
        sessionStorage.setItem("welcome-seen", "1")
      }, 1000)
    }, 3400)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ""
    }
  }, [])

  const container = {
    exit: {
      opacity: 0,
      scale: 1.08,
      filter: "blur(12px)",
      transition: { duration: 0.8, ease: "easeInOut" as const, when: "beforeChildren" as const, staggerChildren: 0.08 },
    },
  }
  const child = {
    exit: { y: -18, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" as const } },
  }

  if (gone) return null

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0a0a0f] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={container}
        >
          <Bg />
          <div className="relative w-full max-w-4xl mx-auto text-center">
            <motion.div className="flex justify-center gap-3 sm:gap-6 md:gap-8 mb-8 md:mb-10" variants={child}>
              {[Code2, User, GitBranch].map((Icon, i) => (
                <div key={i} data-aos="fade-down" data-aos-delay={i * 200}>
                  <IconBtn Icon={Icon} />
                </div>
              ))}
            </motion.div>

            <motion.div className="mb-8 md:mb-10" variants={child}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-none" style={{ fontFamily: "var(--font-effra)" }}>
                <div className="mb-2 sm:mb-3">
                  <span data-aos="fade-right" data-aos-delay="200" className="inline-block px-1 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Welcome</span>{" "}
                  <span data-aos="fade-right" data-aos-delay="400" className="inline-block px-1 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">To</span>{" "}
                  <span data-aos="fade-right" data-aos-delay="600" className="inline-block px-1 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">My</span>
                </div>
                <div>
                  <span data-aos="fade-up" data-aos-delay="800" className="inline-block px-2 bg-gradient-to-r from-[#068e75] to-[#10b981] bg-clip-text text-transparent">Portfolio</span>{" "}
                  <span data-aos="fade-up" data-aos-delay="1000" className="inline-block px-2 bg-gradient-to-r from-[#068e75] to-[#10b981] bg-clip-text text-transparent">Website</span>
                </div>
              </h1>
            </motion.div>

            <motion.div variants={child} data-aos="fade-up" data-aos-delay="1200">
              <a href="https://ibnuakill.vercel.app" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur relative group hover:scale-105 transition-transform duration-300">
                <div className="relative flex items-center gap-2 text-lg sm:text-xl">
                  <Globe className="w-5 h-5 text-white/60" />
                  <span className="text-white/80 font-medium">
                    <Typewriter text="ibnuakill.com" />
                  </span>
                </div>
              </a>
            </motion.div>

            <div className="mt-8 flex justify-center">
              <div className="w-32 h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-[#068e75] to-[#10b981]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.4, ease: "linear" }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
