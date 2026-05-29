import { LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

export default function AuthBox({ onMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");

  async function submit(event) {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    onMessage("");

    const credentials = { email: email.trim(), password };
    const { error } =
      mode === "register"
        ? await supabase.auth.signUp(credentials)
        : await supabase.auth.signInWithPassword(credentials);

    setLoading(false);

    if (error) {
      onMessage(error.message);
      return;
    }

    onMessage(
      mode === "register"
        ? "Cuenta creada. Si Supabase pide confirmacion, revisa tu correo."
        : "Sesion iniciada. Sincronizando progreso...",
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="auth-box muted-box">
        <strong>Sin Supabase configurado</strong>
        <p>La web funciona igual, pero solo guarda progreso en este dispositivo hasta que pongas las variables de entorno.</p>
      </div>
    );
  }

  return (
    <form className="auth-box" onSubmit={submit}>
      <div>
        <p className="eyebrow">Sincronizacion</p>
        <h3>Inicia sesion para usar PC y movil</h3>
      </div>
      <label className="field">
        <span>Email</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="tu@email.com" />
      </label>
      <label className="field">
        <span>Contrasena</span>
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required minLength={6} placeholder="Minimo 6 caracteres" />
      </label>
      <div className="auth-actions">
        <button className="primary" type="submit" disabled={loading}>
          {mode === "login" ? <LogIn size={18} /> : <UserPlus size={18} />}
          {loading ? "Procesando..." : mode === "login" ? "Iniciar sesion" : "Crear cuenta"}
        </button>
        <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Registrarme" : "Ya tengo cuenta"}
        </button>
      </div>
      <p className="sync-note">Para sincronizar entre PC y movil, inicia sesion con la misma cuenta.</p>
    </form>
  );
}
