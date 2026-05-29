import { Download, RefreshCw, Trash2, Upload } from "lucide-react";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import AuthBox from "./AuthBox";
import UserMenu from "./UserMenu";

export default function SettingsPanel({
  session,
  syncStatus,
  syncMessage,
  authMessage,
  onAuthMessage,
  onSync,
  onExport,
  onImport,
  onClearLocal,
  onClearRemote,
  onClearAll,
}) {
  function handleImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onImport(String(reader.result || ""));
    reader.readAsText(file);
    event.target.value = "";
  }

  return (
    <section className="settings-shell">
      <div className="settings-hero">
        <div>
          <p className="eyebrow">Ajustes</p>
          <h2>Cuenta y progreso</h2>
          <p>Sin login se guarda en este dispositivo. Con Supabase se sincroniza entre ordenador y movil.</p>
        </div>
        <UserMenu session={session} syncStatus={syncStatus} syncMessage={syncMessage} onSync={onSync} />
      </div>

      <div className="settings-grid">
        <article className="settings-card">
          {session?.user ? (
            <div className="auth-box muted-box">
              <strong>Sesion iniciada</strong>
              <p>Tu progreso local se mezcla con el remoto y se guarda automaticamente al terminar tests o marcar tarjetas.</p>
            </div>
          ) : (
            <AuthBox onMessage={onAuthMessage} />
          )}
          {authMessage && <p className="auth-message">{authMessage}</p>}
          {!isSupabaseConfigured && (
            <p className="sync-note">Cuando publiques con GitHub Pages, anade las claves de Supabase como secrets de Actions.</p>
          )}
        </article>

        <article className="settings-card">
          <h3>Copias de seguridad</h3>
          <p>Exporta o importa un JSON con estadisticas, falladas y tarjetas de estudio.</p>
          <div className="settings-actions">
            <button type="button" onClick={onExport}>
              <Download size={18} />
              Exportar progreso
            </button>
            <label className="file-button">
              <Upload size={18} />
              Importar JSON
              <input type="file" accept="application/json,.json" onChange={handleImport} />
            </label>
            <button type="button" onClick={onSync} disabled={!session?.user || syncStatus === "pending"}>
              <RefreshCw size={18} />
              Sincronizar ahora
            </button>
          </div>
        </article>

        <article className="settings-card danger-card">
          <h3>Borrar progreso</h3>
          <p>Usa esto solo si quieres empezar limpio o quitar datos de un dispositivo.</p>
          <div className="settings-actions">
            <button type="button" onClick={onClearLocal}>
              <Trash2 size={18} />
              Borrar local
            </button>
            <button type="button" onClick={onClearRemote} disabled={!session?.user}>
              <Trash2 size={18} />
              Borrar remoto
            </button>
            <button type="button" onClick={onClearAll}>
              <Trash2 size={18} />
              Borrar todo
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
