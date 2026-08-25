export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-6">Kontak</h1>
      <form className="space-y-4">
        <input placeholder="Nama" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#10b981]" />
        <input placeholder="Email" type="email" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#10b981]" />
        <textarea placeholder="Pesan" rows={5} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#10b981]" />
        <button type="submit" className="rounded-lg bg-[#068e75] px-6 py-3 text-white font-medium hover:bg-[#068e75]/90">Kirim</button>
      </form>
    </div>
  )
}
