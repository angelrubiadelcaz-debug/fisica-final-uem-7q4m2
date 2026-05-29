import { Cloud, CloudOff, LogOut, RefreshCw, UserCircle } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

const statusLabel = {
  local: "Guardado localmente",
  pending: "Pendiente de sincronizar",
  synced: "Sincronizado",
  error: "Error al sincronizar",
};

export default function UserMenu({ session, syncStatus, syncMessage, onSync }) {
  const connected = Boolean(session?.user);

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  return (
    <div className={`user-menu status-${syncStatus}`}>
      <div className="user-line">
        {connected ? <UserCircle size={18} /> : isSupabaseConfigured ? <CloudOff size={18} /> : <Cloud size={18} />}
        <span>{connected ? session.user.email : "Sin login"}</span>
      </div>
      <div className="sync-line">
        <span>{statusLabel[syncStatus] || "Guardado localmente"}</span>
        {syncMessage ? <small>{syncMessage}</small> : null}
      </div>
      <div className="user-actions">
        <button type="button" onClick={onSync} disabled={!connected || syncStatus === "pending"}>
          <RefreshCw size={16} />
          Sincronizar ahora
        </button>
        {connected && (
          <button type="button" onClick={signOut}>
            <LogOut size={16} />
            Salir
          </button>
        )}
      </div>
    </div>
  );
}
