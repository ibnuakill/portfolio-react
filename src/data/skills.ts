export const skills = [
  { name: "HTML", category: "Frontend", level: "Advanced" },
  { name: "CSS", category: "Frontend", level: "Advanced" },
  { name: "JavaScript", category: "Language", level: "Advanced" },
  { name: "TypeScript", category: "Language", level: "Advanced" },
  { name: "React", category: "Frontend", level: "Advanced" },
  { name: "Astro", category: "Frontend", level: "Advanced" },
  { name: "Tailwind CSS", category: "Styling", level: "Advanced" },
  { name: "Bootstrap", category: "Styling", level: "Intermediate" },
  { name: "Vite", category: "Tools", level: "Advanced" },
  { name: "Node.js", category: "Backend", level: "Intermediate" },
  { name: "Firebase", category: "Backend", level: "Intermediate" },
  { name: "Material UI", category: "Styling", level: "Intermediate" },
  { name: "PostgreSQL", category: "Database", level: "Intermediate" },
  { name: "Vercel", category: "Tools", level: "Advanced" },
  { name: "SweetAlert2", category: "Tools", level: "Intermediate" },
  { name: "Git", category: "Tools", level: "Advanced" },
  { name: "Docker", category: "DevOps", level: "Beginner" },
]

export const skillCategories = [...new Set(skills.map((s) => s.category))]
