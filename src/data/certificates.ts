export type Certificate = {
  title: string
  issuer: string
  date: string
  image: string
  credentialUrl?: string
}

export const certificates: Certificate[] = [
  { title: "React Developer", issuer: "Dicoding", date: "2024", image: "https://picsum.photos/seed/cert1/600/400", credentialUrl: "#" },
  { title: "AWS Cloud Practitioner", issuer: "AWS", date: "2023", image: "https://picsum.photos/seed/cert2/600/400", credentialUrl: "#" },
  { title: "Frontend Fundamentals", issuer: "MySkill", date: "2023", image: "https://picsum.photos/seed/cert3/600/400", credentialUrl: "#" },
]
