type Props = {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  featured?: boolean
}
export default function ProjectCard({ title, description, image, tags, demoUrl, repoUrl, featured }: Props) {
  return (
    <article className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-[#068e75]/20 hover:border-[#068e75]/50 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-[#068e75]/10 via-[#10b981]/10 to-white/5 opacity-50 group-hover:opacity-70 transition-opacity pointer-events-none" />
      <div className="relative p-5 z-10 flex h-full flex-col">
        <div className="relative overflow-hidden rounded-lg aspect-video bg-black/20">
          <img src={image} alt="" loading="lazy" width={400} height={225} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {featured && <span className="absolute right-3 top-3 rounded-full bg-[#068e75] px-3 py-1 text-[0.7rem] font-semibold uppercase text-white">Unggulan</span>}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700 pointer-events-none" />
        </div>
        <div className="mt-4 flex flex-1 flex-col">
          <h3 className="mb-2 text-lg font-semibold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">{title}</h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-white/70 line-clamp-2">{description}</p>
          <div className="mb-5 flex flex-wrap gap-2">
            {tags.map(tag => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 group-hover:bg-white/10 group-hover:text-white transition-colors">{tag}</span>)}
          </div>
          <div className="flex gap-3">
            {demoUrl && <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="group/btn relative inline-flex items-center gap-2 rounded-lg bg-[#068e75] px-5 py-2.5 text-sm font-medium text-white overflow-hidden hover:bg-[#068e75]/90"><span className="absolute inset-0 scale-x-0 group-hover/btn:scale-x-100 origin-left bg-white/10 transition-transform duration-500" /><span className="relative flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>Demo</span></a>}
            {repoUrl && <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-5 py-2.5 text-sm text-white/90 hover:bg-white/10">Kode</a>}
          </div>
        </div>
      </div>
    </article>
  )
}
