import ProjectCard from "../components/ProjectCard"
const projects = [
  { title: "Portfolio V5", description: "Portfolio dengan glassmorphism", image: "https://picsum.photos/seed/a1/600/340", tags: ["React","Tailwind"], demoUrl: "#", repoUrl: "#" },
  { title: "Todo App", description: "Todo app dengan filter", image: "https://picsum.photos/seed/a2/600/340", tags: ["React"], demoUrl: "#", repoUrl: "#" },
  { title: "Blog Engine", description: "Blog MDX", image: "https://picsum.photos/seed/a3/600/340", tags: ["Vite"], demoUrl: "#", repoUrl: "#" },
]
export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-black text-white mb-8">PROJECTS</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => <ProjectCard key={p.title} {...p} />)}
      </div>
    </div>
  )
}
