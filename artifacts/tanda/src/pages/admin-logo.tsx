import { type ChangeEvent, useEffect, useState } from "react";
import {
  getGetAdminBrandLogoQueryKey,
  getGetBrandLogoQueryKey,
  useGetAdminBrandLogo,
  useRemoveBrandLogo,
  useRequestUploadUrl,
  useUpdateBrandLogo,
} from "@workspace/api-client-react";
import { useAuth, useClerk, useUser } from "@clerk/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Check,
  CircleAlert,
  ImagePlus,
  LoaderCircle,
  LogOut,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import "./admin-logo.css";

type Language = "es" | "en";

const text = {
  en: {
    title: "Logo settings",
    subtitle: "Manage the animated mark used across the Tanda website.",
    publicSite: "View public site",
    signOut: "Sign out",
    approved: "Admin access verified",
    current: "Current website logo",
    fallback: "The animated Tanda wordmark is currently in use.",
    uploaded: "Uploaded logo",
    updated: "Updated",
    uploadTitle: "Upload a new logo",
    uploadBody: "GIF, APNG, PNG, JPEG, or WebP · up to 3 MB. Animated formats keep their motion.",
    choose: "Choose image",
    change: "Choose a different image",
    save: "Save logo",
    uploading: "Uploading logo…",
    remove: "Remove uploaded logo",
    removePrompt: "Remove the uploaded logo and return to the animated Tanda wordmark?",
    confirmRemove: "Remove logo",
    cancel: "Keep logo",
    notSelected: "No image selected",
    invalidType: "Choose a GIF, APNG, PNG, JPEG, or WebP image.",
    tooLarge: "The logo must be 3 MB or smaller.",
    saved: "Logo updated on the public site.",
    removed: "Uploaded logo removed.",
    saveFailed: "The logo could not be saved. Try again.",
    removeFailed: "The uploaded logo could not be removed. Try again.",
    loading: "Checking administrator access…",
    denied: "This account is not approved to manage the Tanda logo.",
    deniedHelp: "Sign in with the approved administrator account.",
    signIn: "Sign in",
    createAccount: "Create admin account",
    signInRequired: "Sign in to manage the website logo.",
    noLogo: "No uploaded logo is active.",
    back: "Back to Tanda",
    language: "ES",
    languageLabel: "Switch language to Spanish",
  },
  es: {
    title: "Ajustes del logo",
    subtitle: "Administra el logo animado que aparece en el sitio de Tanda.",
    publicSite: "Ver sitio público",
    signOut: "Cerrar sesión",
    approved: "Acceso de administrador verificado",
    current: "Logo actual del sitio",
    fallback: "Actualmente se usa el logo animado de Tanda.",
    uploaded: "Logo cargado",
    updated: "Actualizado",
    uploadTitle: "Cargar un logo nuevo",
    uploadBody: "GIF, APNG, PNG, JPEG o WebP · máximo 3 MB. Los formatos animados conservan el movimiento.",
    choose: "Elegir imagen",
    change: "Elegir otra imagen",
    save: "Guardar logo",
    uploading: "Cargando logo…",
    remove: "Quitar logo cargado",
    removePrompt: "¿Quitar el logo cargado y volver al logo animado de Tanda?",
    confirmRemove: "Quitar logo",
    cancel: "Conservar logo",
    notSelected: "No se eligió ninguna imagen",
    invalidType: "Elige una imagen GIF, APNG, PNG, JPEG o WebP.",
    tooLarge: "El logo debe pesar 3 MB o menos.",
    saved: "Logo actualizado en el sitio público.",
    removed: "Logo cargado eliminado.",
    saveFailed: "No se pudo guardar el logo. Inténtalo de nuevo.",
    removeFailed: "No se pudo quitar el logo. Inténtalo de nuevo.",
    loading: "Verificando el acceso de administrador…",
    denied: "Esta cuenta no tiene permiso para administrar el logo de Tanda.",
    deniedHelp: "Inicia sesión con la cuenta autorizada.",
    signIn: "Iniciar sesión",
    createAccount: "Crear cuenta de administrador",
    signInRequired: "Inicia sesión para administrar el logo del sitio.",
    noLogo: "No hay ningún logo cargado activo.",
    back: "Volver a Tanda",
    language: "EN",
    languageLabel: "Switch language to English",
  },
} as const;

const allowedTypes = new Set([
  "image/apng",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const maxBytes = 3 * 1024 * 1024;

function getApiErrorStatus(error: unknown): number | undefined {
  if (typeof error === "object" && error !== null && "status" in error) {
    const status = (error as { status?: unknown }).status;
    return typeof status === "number" ? status : undefined;
  }
  return undefined;
}

function SignInRequired({ t }: { t: typeof text.en | typeof text.es }) {
  return (
    <div className="logo-admin-state">
      <span className="logo-admin-state-icon"><ShieldCheck size={22} /></span>
      <h1>{t.title}</h1>
      <p>{t.signInRequired}</p>
      <Link className="logo-admin-button logo-admin-button-primary" href="/sign-in">
        {t.signIn}
      </Link>
      <Link className="logo-admin-text-link" href="/sign-up">
        {t.createAccount}
      </Link>
      <Link className="logo-admin-back" href="/">{t.back}</Link>
    </div>
  );
}

export default function AdminLogoPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const [language, setLanguage] = useState<Language>(
    () => localStorage.getItem("tanda-language") === "en" ? "en" : "es",
  );
  const t = text[language];

  useEffect(() => {
    localStorage.setItem("tanda-language", language);
  }, [language]);

  if (!isLoaded) {
    return <main className="logo-admin-page"><div className="logo-admin-state"><LoaderCircle className="logo-admin-spinner" /><p>{t.loading}</p></div></main>;
  }
  if (!isSignedIn) {
    return <main className="logo-admin-page"><SignInRequired t={t} /></main>;
  }

  return <LogoManager language={language} setLanguage={setLanguage} t={t} />;
}

function LogoManager({
  language,
  setLanguage,
  t,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof text.en | typeof text.es;
}) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [actionError, setActionError] = useState("");
  const adminLogo = useGetAdminBrandLogo({
    query: {
      enabled: true,
      queryKey: getGetAdminBrandLogoQueryKey(),
    },
  });
  const requestUpload = useRequestUploadUrl();
  const updateLogo = useUpdateBrandLogo();
  const removeLogo = useRemoveBrandLogo();
  const busy = requestUpload.isPending || updateLogo.isPending || removeLogo.isPending;
  const logo = adminLogo.data;

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setActionError("");
    if (nextFile && !allowedTypes.has(nextFile.type.toLowerCase())) {
      setFile(null);
      event.target.value = "";
      setActionError(t.invalidType);
      return;
    }
    if (nextFile && nextFile.size > maxBytes) {
      setFile(null);
      event.target.value = "";
      setActionError(t.tooLarge);
      return;
    }
    setFile(nextFile);
  };

  const saveLogo = async () => {
    if (!file) return;
    setActionError("");
    try {
      const upload = await requestUpload.mutateAsync({
        data: { name: file.name, size: file.size, contentType: file.type },
      });
      const response = await fetch(upload.uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!response.ok) throw new Error("Object storage rejected the upload.");

      await updateLogo.mutateAsync({
        data: {
          objectPath: upload.objectPath,
          filename: file.name,
          contentType: file.type,
        },
      });
      setFile(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: getGetAdminBrandLogoQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getGetBrandLogoQueryKey() }),
      ]);
      toast.success(t.saved);
    } catch {
      setActionError(t.saveFailed);
    }
  };

  const confirmLogoRemoval = async () => {
    setActionError("");
    try {
      await removeLogo.mutateAsync();
      setConfirmRemove(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: getGetAdminBrandLogoQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getGetBrandLogoQueryKey() }),
      ]);
      toast.success(t.removed);
    } catch {
      setActionError(t.removeFailed);
    }
  };

  const errorStatus = getApiErrorStatus(adminLogo.error);
  if (adminLogo.isLoading) {
    return <main className="logo-admin-page"><div className="logo-admin-state"><LoaderCircle className="logo-admin-spinner" /><p>{t.loading}</p></div></main>;
  }
  if (adminLogo.isError && errorStatus === 403) {
    return <main className="logo-admin-page"><div className="logo-admin-state"><span className="logo-admin-state-icon"><CircleAlert size={22} /></span><h1>{t.title}</h1><p>{t.denied}</p><small>{t.deniedHelp}</small><Link className="logo-admin-back" href="/">{t.back}</Link></div></main>;
  }

  return (
    <main className="logo-admin-page">
      <header className="logo-admin-header">
        <Link className="logo-admin-wordmark" href="/" aria-label="Tanda public website">tanda<span>·</span></Link>
        <div className="logo-admin-header-actions">
          <button className="logo-admin-language" type="button" onClick={() => setLanguage(language === "en" ? "es" : "en")} aria-label={t.languageLabel}>{t.language}</button>
          <Link className="logo-admin-public-link" href="/?public-preview=1">{t.publicSite}<ArrowLeft size={14} /></Link>
          <button className="logo-admin-signout" type="button" onClick={() => signOut({ redirectUrl: import.meta.env.BASE_URL || "/" })}><LogOut size={15} />{t.signOut}</button>
        </div>
      </header>
      <div className="logo-admin-content">
        <div className="logo-admin-heading">
          <span className="logo-admin-kicker"><ShieldCheck size={14} />{t.approved}</span>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <span className="logo-admin-user">{user?.primaryEmailAddress?.emailAddress}</span>
        </div>

        {adminLogo.isError && errorStatus !== 403 && (
          <div className="logo-admin-alert" role="alert"><CircleAlert size={17} />{t.deniedHelp}</div>
        )}
        {actionError && <div className="logo-admin-alert" role="alert"><CircleAlert size={17} />{actionError}</div>}

        <section className="logo-admin-current">
          <div className="logo-admin-section-title"><span>01</span><h2>{t.current}</h2></div>
          <div className="logo-admin-preview">
            <div className="logo-admin-preview-mark">
              {previewUrl || logo?.logoUrl
                ? <img src={previewUrl ?? logo?.logoUrl ?? ""} alt="Animated Tanda logo preview" />
                : <span className="logo-admin-fallback">tanda<span>·</span></span>}
            </div>
            <div className="logo-admin-preview-meta">
              <strong>{file?.name ?? logo?.filename ?? (logo?.logoUrl ? t.uploaded : t.noLogo)}</strong>
              <span>{file ? t.uploadTitle : logo?.logoUrl ? t.uploaded : t.fallback}</span>
              {logo?.updatedAt && <small>{t.updated} · {new Date(logo.updatedAt).toLocaleDateString(language === "es" ? "es-CO" : "en-US")}</small>}
            </div>
            {logo?.logoUrl && <span className="logo-admin-live"><Check size={13} />LIVE</span>}
          </div>
        </section>

        <section className="logo-admin-upload">
          <div className="logo-admin-section-title"><span>02</span><h2>{t.uploadTitle}</h2></div>
          <p>{t.uploadBody}</p>
          <label className={`logo-admin-dropzone${file ? " has-file" : ""}`} htmlFor="logo-file">
            <span className="logo-admin-upload-icon">{file ? <Check size={19} /> : <ImagePlus size={19} />}</span>
            <strong>{file ? file.name : logo?.logoUrl ? t.change : t.choose}</strong>
            <small>{file ? `${(file.size / 1024).toFixed(0)} KB` : t.notSelected}</small>
            <input
              id="logo-file"
              type="file"
              accept="image/gif,image/apng,image/png,image/jpeg,image/webp"
              onChange={onFileChange}
              data-testid="input-logo-file"
            />
          </label>
          <div className="logo-admin-actions">
            <button className="logo-admin-button logo-admin-button-primary" type="button" onClick={saveLogo} disabled={!file || busy} data-testid="button-save-logo">
              {busy ? <LoaderCircle className="logo-admin-spinner" size={16} /> : <Upload size={16} />}
              {busy ? t.uploading : t.save}
            </button>
            {logo?.logoUrl && !confirmRemove && <button className="logo-admin-button logo-admin-button-danger" type="button" onClick={() => setConfirmRemove(true)} disabled={busy} data-testid="button-remove-logo"><Trash2 size={15} />{t.remove}</button>}
          </div>
          {confirmRemove && (
            <div className="logo-admin-confirm" role="alert">
              <p>{t.removePrompt}</p>
              <div>
                <button className="logo-admin-button logo-admin-button-danger" type="button" onClick={confirmLogoRemoval} disabled={busy} data-testid="button-confirm-remove-logo">{busy ? <LoaderCircle className="logo-admin-spinner" size={15} /> : <Trash2 size={15} />}{t.confirmRemove}</button>
                <button className="logo-admin-button logo-admin-button-quiet" type="button" onClick={() => setConfirmRemove(false)} disabled={busy}>{t.cancel}</button>
              </div>
            </div>
          )}
        </section>
        <p className="logo-admin-footnote">{language === "es" ? "El logo se publica en el sitio después de guardarlo." : "The logo appears on the public site after saving."}</p>
      </div>
    </main>
  );
}
