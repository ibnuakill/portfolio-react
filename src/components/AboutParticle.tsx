"use client";
import ParticleImage from "./svgparticles";

export default function AboutParticle({ src }: { src: string }) {
  return (
    <div className="w-full h-full relative">
      <ParticleImage
        width="100%"
        height="100%"
        particleCount={160}
        particleSize={3.6}
        imageConfig={{ image: src, mode: "fit", scale: 9 }}
        hoverConfig={{
          hoverType: "roam",
          roamOpacity: 1,
          transition: { duration: 0.9, ease: "easeInOut" },
        }}
        repulsionConfig={{ repulsionForce: 4, repulsionRadius: 48 }}
      />
    </div>
  );
}
