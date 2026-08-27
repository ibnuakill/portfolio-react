import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import WelcomeScreen from "../components/WelcomeScreen";
import V5Background from "../components/V5Background";
import CodeLottie from "../components/CodeLottie";
import AboutParticle from "../components/AboutParticle";
import ProjectCard from "../components/ProjectCard";
import { skills, skillCategories } from "../data/skills";
import { social } from "../data/social";
import { hero } from "../data/hero";
import { site } from "../data/site";
import { certificates as localCerts } from "../data/certificates";
import { supabase } from "../lib/supabase";

const featured = [
  {
    title: "Portfolio V5",
    description: "Portfolio Astro dengan glassmorphism & particle effect",
    image: "https://picsum.photos/seed/p1/600/340",
    tags: ["Astro", "React", "Tailwind"],
    demoUrl: "#",
    repoUrl: "https://github.com/ibnuakill/portfolio",
    featured: true,
  },
  {
    title: "E-Commerce API",
    description: "REST API Node.js + PostgreSQL",
    image: "https://picsum.photos/seed/p2/600/340",
    tags: ["Node.js", "PostgreSQL"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Landing Page",
    description: "Landing page cepat dengan Astro",
    image: "https://picsum.photos/seed/p3/600/340",
    tags: ["Astro", "Tailwind"],
    demoUrl: "#",
    repoUrl: "#",
  },
];

export default function Home() {
  const [tab, setTab] = useState<"project" | "sertifikat">("project");
  const [certs, setCerts] = useState(localCerts);
  const [projects, setProjects] = useState(featured);
  useEffect(() => {
    AOS.init({ once: false, offset: 10, duration: 800 });
    const onLoad = () => AOS.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  useEffect(() => {
    if (window.location.hash === "#sertifikat") setTab("sertifikat");
    if (!supabase) return;
    supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }: any) => {
        if (data && data.length)
          setCerts(
            data.map((d: any) => ({
              title: d.title,
              issuer: d.issuer,
              date: d.date,
              image: d.image_url,
              credentialUrl: d.credential_url || d.image_url,
            })),
          );
      });
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }: any) => {
        if (data && data.length)
          setProjects(
            data.map((d: any) => ({
              title: d.title,
              description: d.description,
              image: d.image_url,
              tags: d.tags || [],
              demoUrl: d.demo_url,
              repoUrl: d.repo_url,
            })),
          );
      });
  }, []);

  return (
    <>
      <WelcomeScreen />
      <V5Background />
      <section className="mx-auto w-full max-w-[1280px] px-2 sm:px-3 mt-2">
        <div className="relative overflow-hidden bg-[#0a0a0f] border border-white/10 min-h-[calc(100dvh-72px)] flex flex-col">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#068e75]/30 via-[#068e75]/15 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
            <div className="flex-1 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center mt-2">
              <div className="space-y-5">
                <h1
                  className="font-black tracking-tighter leading-[0.85] text-white"
                  style={{
                    fontFamily: "var(--font-effra)",
                    fontWeight: 950,
                    WebkitTextStrokeWidth: "0.7px",
                    WebkitTextStrokeColor: "currentColor",
                    paintOrder: "stroke fill",
                  }}
                >
                  <span className="block text-[11vw] sm:text-6xl lg:text-[76px]">
                    WEB
                  </span>
                  <span className="block text-[11vw] sm:text-6xl lg:text-[76px] bg-gradient-to-r from-[#068e75] to-[#10b981] bg-clip-text text-transparent">
                    DEVELOPER
                  </span>
                </h1>
                <p className="max-w-[360px] text-sm leading-relaxed text-white/60">
                  Web Developer — crafting fast & clean web apps with React &
                  Vite.
                </p>
                <Link
                  to={hero.primaryCta.href}
                  className="group relative inline-flex items-center gap-2 rounded-lg bg-[#068e75] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#068e75]/90 transition-all duration-300 group-hover:gap-3 overflow-hidden"
                >
                  <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left bg-white/10 transition-transform duration-500 pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-2">
                    {hero.primaryCta.label}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-300 group-hover:rotate-45"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </Link>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="w-full max-w-[520px] h-[320px] sm:h-[400px] lg:h-[460px] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#068e75]/15 via-transparent to-[#10b981]/10 rounded-3xl blur-2xl pointer-events-none" />
                  <div className="relative w-full h-full flex">
                    <CodeLottie />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden sm:flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                Follow Me
              </span>
              <span className="h-px w-8 bg-white/20" />
              <div className="flex gap-1.5">
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  className="w-7 h-7 rounded-full bg-white/10 border border-white/10 grid place-items-center text-white/70 hover:bg-white hover:text-black transition-colors"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-full bg-white/10 border border-white/10 grid place-items-center text-white/70 hover:bg-white hover:text-black transition-colors"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full bg-white/10 border border-white/10 grid place-items-center text-white/70 hover:bg-white hover:text-black transition-colors"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={social.email}
                  aria-label="Email"
                  className="w-7 h-7 rounded-full bg-white/10 border border-white/10 grid place-items-center text-white/70 hover:bg-white hover:text-black transition-colors"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 8.5 6.5a2 2 0 0 0 2.5 0L22 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative bg-[#0a0a0a] text-white overflow-hidden pb-[8%] px-[5%] sm:px-[5%] lg:px-[10%] pt-10 border-y border-white/10"
        id="About"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#068e75]/25 via-[#068e75]/10 to-transparent pointer-events-none" />
        <div
          className="text-center lg:mb-8 mb-6 px-[5%]"
          data-aos="zoom-in-up"
          data-aos-duration="600"
        >
          <h2
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#068e75] to-[#10b981]"
            style={{ fontFamily: "var(--font-effra)" }}
          >
            ABOUT ME
          </h2>
          <p
            className="mt-3 text-white/60 max-w-2xl mx-auto text-base flex items-center justify-center gap-2"
            data-aos="zoom-in-up"
            data-aos-duration="800"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#34d399"
              strokeWidth="1.5"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063A2 2 0 0 0 14.063 15.5l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              <path d="M20 3v4" />
              <path d="M22 5h-4" />
              <path d="M4 17v5" />
              <path d="M5 22H1" />
            </svg>
            Transforming ideas into digital experiences
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#34d399"
              strokeWidth="1.5"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063A2 2 0 0 0 14.063 15.5l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              <path d="M20 3v4" />
              <path d="M22 5h-4" />
              <path d="M4 17v5" />
              <path d="M5 22H1" />
            </svg>
          </p>
        </div>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-4">
          <div className="space-y-6 text-center lg:text-left">
            <h3
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
              style={{ fontFamily: "var(--font-effra)" }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#068e75] to-[#10b981]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-white"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                {site.name}
              </span>
            </h3>
            <p
              className="text-base sm:text-lg text-white/60 leading-relaxed text-justify lg:text-left pb-2"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Saya adalah Web Developer yang berfokus pada pengembangan aplikasi
              web modern. Saya senang membangun solusi digital yang cepat, rapi,
              dan mudah digunakan — menggabungkan intuisi produk dengan rekayasa
              sistem untuk hasil yang andal.
            </p>
            <div
              className="relative bg-gradient-to-br from-[#068e75]/5 via-transparent to-[#10b981]/5 border border-[#068e75]/20 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="1700"
            >
              <div className="absolute top-3 left-4 text-[#10b981] opacity-30">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>
              <blockquote className="text-white/70 text-center lg:text-left italic font-medium text-sm pl-6">
                "Leveraging AI as a professional tool, not a replacement."
              </blockquote>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <Link
                to="/contact"
                className="w-full lg:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#068e75] to-[#10b981] text-white font-medium hover:scale-105 transition flex items-center justify-center gap-2"
              >
                Download CV
              </Link>
              <Link
                to="/projects"
                className="w-full lg:w-auto px-6 py-3 rounded-lg border border-[#10b981]/50 text-[#10b981] font-medium hover:scale-105 hover:bg-[#10b981]/10 transition flex items-center justify-center gap-2"
              >
                View Projects
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end p-2 sm:p-8">
            <div
              className="relative"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px] rounded-[2.8rem] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm brightness-[1.35] contrast-[1.15] shadow-[0_0_60px_rgba(255,255,255,0.06)]">
                <AboutParticle src="/images/bg-profile.png" />
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes spin-slower{to{transform:rotate(360deg)}}.animate-spin-slower{animation:spin-slower 8s linear infinite}`}</style>
      </section>

      <section
        id="projects"
        className="relative py-20 border-y border-white/10 bg-[#0a0a0f] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div id="sertifikat" className="absolute -top-20" />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 relative">
          <header className="mb-8 text-center" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
              {tab === "project"
                ? "Auto-sync GitHub • ibnuakill"
                : "Koleksi pencapaian"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {tab === "project" ? "PROJECT" : "SERTIFIKAT"}
            </h2>
          </header>

          <div
            className="flex justify-center mb-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="inline-flex p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur">
              <button
                onClick={() => setTab("project")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${tab === "project" ? "bg-[#068e75] text-white shadow-lg" : "text-white/60 hover:text-white"}`}
              >
                Project
              </button>
              <button
                onClick={() => setTab("sertifikat")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${tab === "sertifikat" ? "bg-[#068e75] text-white shadow-lg" : "text-white/60 hover:text-white"}`}
              >
                Sertifikat
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform:
                  tab === "project" ? "translateX(0)" : "translateX(-100%)",
              }}
            >
              <div className="w-full shrink-0">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p, idx) => (
                    <div
                      key={p.title + idx}
                      data-aos={
                        idx % 3 === 0
                          ? "fade-up-right"
                          : idx % 3 === 1
                            ? "fade-up"
                            : "fade-up-left"
                      }
                    >
                      <ProjectCard {...p} />
                    </div>
                  ))}
                </div>
                <div className="mt-10 text-center">
                  <Link
                    to="/projects"
                    className="inline-flex rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-white hover:bg-white/10"
                  >
                    Lihat Semua Project →
                  </Link>
                </div>
              </div>
              <div className="w-full shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certs.map((c, idx) => (
                    <a
                      key={c.title + idx}
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener"
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur hover:border-[#068e75]/40 transition-all hover:-translate-y-1"
                    >
                      <div className="aspect-[3/2] overflow-hidden bg-black/20">
                        <img
                          src={c.image}
                          alt={c.title}
                          loading="lazy"
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-white line-clamp-1">
                          {c.title}
                        </h3>
                        <p className="text-sm text-white/60">
                          {c.issuer} • {c.date}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <p className="mt-6 text-center text-xs text-white/40">
                  Taruh file di{" "}
                  <span className="text-white/70">public/certificates/</span>{" "}
                  dan tambah di{" "}
                  <code className="text-[#10b981]">
                    src/data/certificates.ts
                  </code>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setTab("project")}
              aria-label="Slide project"
              className={`h-2 rounded-full transition-all duration-300 ${tab === "project" ? "w-8 bg-[#068e75]" : "w-2 bg-white/20"}`}
            />
            <button
              onClick={() => setTab("sertifikat")}
              aria-label="Slide sertifikat"
              className={`h-2 rounded-full transition-all duration-300 ${tab === "sertifikat" ? "w-8 bg-[#068e75]" : "w-2 bg-white/20"}`}
            />
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="mb-12 text-center" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/60 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />{" "}
              Tech Stack
            </div>
            <h2 className="mb-3 text-3xl font-semibold text-white">Keahlian</h2>
            <p className="mx-auto max-w-[600px] text-white/50">
              Teknologi yang saya gunakan
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((cat, idx) => (
              <div
                key={cat}
                data-aos={
                  idx % 3 === 0
                    ? "fade-up-right"
                    : idx % 3 === 1
                      ? "fade-up"
                      : "fade-up-left"
                }
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:bg-white/[0.07]"
              >
                <h3 className="text-sm font-semibold text-white uppercase mb-3">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === cat)
                    .map((s) => (
                      <span
                        key={s.name}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-sm text-white/90"
                      >
                        {s.name}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
