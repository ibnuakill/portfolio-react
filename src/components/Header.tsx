import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { social } from "../data/social"

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#About", label: "About", hash: true } as any,
  { to: "/projects", label: "Project" },
  { to: "/contact", label: "Contact" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-[100] h-16 border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-xl font-bold tracking-tight text-white">Portfolio</Link>
        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-8">
            {navLinks.map((l: any) => (
              <li key={l.to}>
                {l.hash ? (
                  <a href={l.to} onClick={(e) => { e.preventDefault(); document.querySelector('#About')?.scrollIntoView({ behavior: 'smooth' }); if (window.location.pathname !== '/') window.location.href = l.to; }} className="group relative font-medium text-[0.9375rem] text-white/60 hover:text-white transition-colors py-1">
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#10b981] rounded-sm scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </a>
                ) : (
                  <NavLink to={l.to} end={l.to === "/"} className="group relative font-medium text-[0.9375rem] py-1 text-white/60 hover:text-white transition-colors">
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#10b981] rounded-sm scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden" aria-label="Toggle menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl px-4 py-6 sm:px-6 md:hidden">
          <nav aria-label="Mobile navigation">
            <ul>
              {navLinks.map((l: any) => (
                <li key={l.to}>
                  {l.hash ? (
                    <a href={l.to} onClick={() => { setOpen(false); setTimeout(() => document.querySelector('#About')?.scrollIntoView({ behavior: 'smooth' }), 100); if (window.location.pathname !== '/') window.location.href = l.to; }} className="block border-b border-white/10 py-3 font-medium text-white">{l.label}</a>
                  ) : (
                    <NavLink to={l.to} onClick={() => setOpen(false)} className={({ isActive }) => `block border-b border-white/10 py-3 font-medium ${isActive ? "text-[#10b981]" : "text-white"}`}>{l.label}</NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 flex gap-3 border-t border-white/10 pt-6">
            {Object.entries(social).map(([k, url]) => (
              <a key={k} href={url} target="_blank" rel="noopener noreferrer" aria-label={k} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-[#10b981]/50">
                {k}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
