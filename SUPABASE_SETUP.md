# Configurar Supabase paso a paso

Esta guia es para sincronizar el progreso entre PC y movil.

## 1. Crear el proyecto

1. Entra en `https://supabase.com/`.
2. Crea una cuenta o inicia sesion.
3. Pulsa `New project`.
4. Elige una organizacion.
5. Pon un nombre, por ejemplo `fisica-final-uem`.
6. Guarda la contrasena de la base de datos.
7. Elige una region cercana.
8. Crea el proyecto y espera a que termine.

## 2. Crear la tabla

1. En Supabase, entra en tu proyecto.
2. Abre `SQL Editor`.
3. Pulsa `New query`.
4. Pega todo el contenido de:

```text
supabase/schema.sql
```

5. Pulsa `Run`.

Esto crea la tabla `public.user_state` y activa RLS para que cada usuario solo pueda leer y modificar su propio progreso.

## 3. Copiar las claves publicas

1. En Supabase, entra en `Project Settings`.
2. Abre `API`.
3. Copia:
   - `Project URL`
   - `anon public` o `publishable key`

No copies la clave `service_role`.

## 4. Configurar URLs de autenticacion

En Supabase:

1. Entra en `Authentication`.
2. Entra en `URL Configuration`.
3. En `Site URL`, pon:

```text
https://angelrubiadelcaz-debug.github.io/fisica-final-uem-7q4m2/
```

4. En `Redirect URLs`, anade estas URLs:

```text
https://angelrubiadelcaz-debug.github.io/fisica-final-uem-7q4m2/
http://localhost:5173/
http://127.0.0.1:5173/
```

La URL de localhost sirve para probar login en local. La URL de GitHub Pages sirve para usar la web publicada.

## 5. Probar en local

Crea un archivo `.env.local` en la raiz del proyecto:

```bash
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=TU_CLAVE_PUBLICA
```

Instala y arranca:

```bash
npm install
npm run dev
```

En la web:

1. Entra en `Ajustes`.
2. Crea una cuenta con email y contrasena.
3. Haz un test o marca tarjetas.
4. Pulsa `Sincronizar ahora`.

## 6. Configurar GitHub Pages

En GitHub, dentro del repositorio:

1. Entra en `Settings`.
2. Entra en `Secrets and variables`.
3. Entra en `Actions`.
4. Pulsa `New repository secret`.
5. Crea estos dos secrets:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Despues entra en `Settings` -> `Pages` y selecciona:

```text
Source: GitHub Actions
```

Cuando hagas push a `main`, el workflow publicara la web con esas variables.

## 7. Que pasa sin iniciar sesion

La web sigue funcionando.

Sin login:

- el test funciona,
- el modo estudio funciona,
- las falladas se guardan,
- las estadisticas se guardan,
- todo queda solo en ese navegador.

Con login:

- se mezcla el progreso local con Supabase,
- se guarda en Supabase,
- al entrar desde otro dispositivo con la misma cuenta se recupera el progreso.

## 8. Borrar progreso

En la pestaña `Ajustes` puedes borrar:

- `Borrar local`: solo este dispositivo.
- `Borrar remoto`: solo Supabase.
- `Borrar todo`: local y remoto.

Antes de borrar, la web pide confirmacion.
