import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Admin() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [type, setType] = useState<"certificates" | "projects">("certificates")
  const [title, setTitle] = useState("")
  const [issuer, setIssuer] = useState("")
  const [date, setDate] = useState("")
  const [desc, setDesc] = useState("")
  const [tags, setTags] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    supabase?.auth.getSession().then(({ data }: any) => {
      setUser(data.session?.user ?? null)
      setLoadingAuth(false)
    })
    const { data: sub } = supabase?.auth.onAuthStateChange((_: any, session: any) => setUser(session?.user ?? null)) || { data: { subscription: { unsubscribe: () => {} } } }
    return () => sub.subscription.unsubscribe()
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMsg(error.message)
    else setMsg("Login berhasil")
  }
  async function handleLogout() {
    await supabase.auth.signOut()
    setMsg("Logout")
  }
  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return setMsg("Pilih file dulu")
    setLoading(true)
    setMsg("")
    try {
      const ext = file.name.split(".").pop()
      const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const bucket = type === "certificates" ? "certificates" : "projects"
      const { error: upErr } = await supabase.storage.from(bucket).upload(name, file)
      if (upErr) throw upErr
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(name)
      const image_url = urlData.publicUrl
      if (type === "certificates") {
        const { error } = await supabase.from("certificates").insert({ title, issuer, date, image_url })
        if (error) throw error
      } else {
        const { error } = await supabase.from("projects").insert({ title, description: desc, image_url, tags: tags.split(",").map(s => s.trim()).filter(Boolean) })
        if (error) throw error
      }
      setMsg("Berhasil upload!")
      setTitle(""); setIssuer(""); setDate(""); setDesc(""); setTags(""); setFile(null)
    } catch (err: any) {
      setMsg(err.message)
    } finally { setLoading(false) }
  }

  if (loadingAuth) return <div className="mx-auto max-w-xl px-4 py-12 text-white/60">Loading...</div>
  if (!user) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4 bg-white/[0.04] border border-white/10 rounded-2xl p-6">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40" />
          <button className="w-full rounded-lg bg-[#068e75] py-3 text-white font-medium">Login</button>
          {msg && <p className="text-sm text-white/60 text-center">{msg}</p>}
        </form>
        <p className="mt-4 text-xs text-white/30 text-center">Hanya admin terdaftar bisa upload</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Upload</h1>
        <button onClick={handleLogout} className="text-sm text-white/60 hover:text-white">Logout ({user.email})</button>
      </div>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setType("certificates")} className={`px-4 py-2 rounded-lg text-sm ${type==="certificates"?"bg-[#068e75] text-white":"bg-white/10 text-white/60"}`}>Sertifikat</button>
        <button onClick={() => setType("projects")} className={`px-4 py-2 rounded-lg text-sm ${type==="projects"?"bg-[#068e75] text-white":"bg-white/10 text-white/60"}`}>Project</button>
      </div>
      <form onSubmit={handleUpload} className="space-y-4 bg-white/[0.04] border border-white/10 rounded-2xl p-6">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul" required className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40" />
        {type==="certificates" ? (
          <>
            <input value={issuer} onChange={e=>setIssuer(e.target.value)} placeholder="Issuer (Dicoding)" required className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40" />
            <input value={date} onChange={e=>setDate(e.target.value)} placeholder="Tahun (2024)" required className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40" />
          </>
        ) : (
          <>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Deskripsi" required rows={3} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40" />
            <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags pisah koma" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40" />
          </>
        )}
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} required className="w-full text-white/70 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#068e75] file:px-4 file:py-2 file:text-white" />
        <button disabled={loading} className="w-full rounded-lg bg-[#068e75] py-3 text-white font-medium disabled:opacity-50">{loading?"Uploading...":"Upload"}</button>
        {msg && <p className="text-sm text-white/70 text-center">{msg}</p>}
      </form>
    </div>
  )
}
