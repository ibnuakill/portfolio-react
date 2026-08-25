import { social } from "../data/social"
import { site } from "../data/site"

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md pb-8 pt-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <a href="/" className="text-xl font-bold text-white">{site.name}</a>
            <p className="mt-3 max-w-[280px] text-sm text-white/50">{site.description}</p>
          </div>
          <nav className="text-center md:text-left">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">Navigation</h4>
            <ul className="flex flex-col items-center gap-2 md:items-start">
              <li><a href="/projects" className="text-sm text-white/50 hover:text-[#10b981]">Project</a></li>
              <li><a href="/#sertifikat" className="text-sm text-white/50 hover:text-[#10b981]">Certificate</a></li>
              <li><a href="/#About" className="text-sm text-white/50 hover:text-[#10b981]">About</a></li>
              <li><a href="/contact" className="text-sm text-white/50 hover:text-[#10b981]">Contact</a></li>
            </ul>
          </nav>
          <div className="text-center md:text-left">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">Sosial</h4>
            <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
              {Object.entries(social).map(([k, url]) => (
                <a key={k} href={url} target="_blank" rel="noopener noreferrer" aria-label={k} className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/50 hover:text-[#10b981] hover:border-[#10b981]/50 transition-colors">
                  {k === "github" && <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>}
                  {k === "linkedin" && <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>}
                  {k === "facebook" && <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
                  {k === "email" && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                  {k === "twitter" && <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"/></svg>}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 border-t border-white/5 pt-8 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built with React + Vite & deployed on Vercel</p>
        </div>
      </div>
    </footer>
  )
}
