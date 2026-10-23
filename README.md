# Cristal Claro — Sitio Web Profesional

Web completa para **Cristal Claro**, empresa de limpieza profesional de cristales en Las Palmas de Gran Canaria.

---

## 📁 Estructura de archivos

```
pagaina web de limpiaza/
├── index.html              ← Página principal
├── privacidad.html         ← Política de privacidad
├── aviso-legal.html        ← Aviso legal
├── cookies.html            ← Política de cookies
├── robots.txt              ← Directivas para buscadores
├── sitemap.xml             ← Mapa del sitio para SEO
├── css/
│   └── style.css           ← Todos los estilos
├── js/
│   └── main.js             ← Interacciones y formulario
└── assets/
    ├── favicon.svg         ← Favicon SVG
    ├── hero-worker.jpg     ← ⚠️ PENDIENTE: foto del trabajador
    ├── hero-tools.jpg      ← ⚠️ PENDIENTE: foto de herramientas
    ├── why-us.jpg          ← ⚠️ PENDIENTE: imagen sección "Por qué elegirnos"
    ├── gallery-1.jpg       ← ⚠️ PENDIENTE: foto galería 1
    ├── gallery-2.jpg       ← ⚠️ PENDIENTE: foto galería 2
    ├── gallery-3.jpg       ← ⚠️ PENDIENTE: foto galería 3
    └── gallery-4.jpg       ← ⚠️ PENDIENTE: foto galería 4
```

---

## ✅ Funcionalidades implementadas

- [x] Diseño responsive (móvil 375px, tablet 768px, escritorio 1440px)
- [x] Header fijo con navegación y menú hamburguesa móvil
- [x] Hero section de dos columnas con animaciones
- [x] Sección de servicios (4 tarjetas)
- [x] Sección "Por qué elegirnos"
- [x] Galería de trabajos
- [x] CTA banner
- [x] Formulario de contacto con validación completa
- [x] Sección de contacto con teléfono, email y WhatsApp
- [x] Footer completo con textos legales
- [x] Botón flotante de WhatsApp
- [x] Banner de cookies con localStorage
- [x] Páginas legales (privacidad, aviso legal, cookies)
- [x] SEO local optimizado
- [x] Open Graph tags
- [x] robots.txt y sitemap.xml
- [x] Accesibilidad: ARIA, focus visible, navegación por teclado
- [x] Animaciones con Intersection Observer (respeta prefers-reduced-motion)

---

## ⚠️ Configuraciones pendientes antes de publicar

### 1. Añadir las fotografías reales

Copia las fotos proporcionadas por el cliente a la carpeta `assets/` con estos nombres:

| Archivo | Descripción |
|---|---|
| `hero-worker.jpg` | Fotografía principal del trabajador limpiando |
| `hero-tools.jpg` | Fotografía de las herramientas (imagen secundaria) |
| `why-us.jpg` | Imagen para la sección "Por qué elegirnos" |
| `gallery-1.jpg` | Foto galería — oficinas |
| `gallery-2.jpg` | Foto galería — local comercial |
| `gallery-3.jpg` | Foto galería — vivienda |
| `gallery-4.jpg` | Foto galería — superficie acristalada |

> **Nota:** Si las imágenes no están disponibles, los elementos muestran un placeholder con fondo turquesa para no romper el diseño.

### 2. Activar el formulario de contacto (Formspree — recomendado)

El formulario está listo pero necesita un servicio backend para enviar mensajes:

**Opción A — Formspree (gratuito, sin servidor):**
1. Crea una cuenta en [formspree.io](https://formspree.io)
2. Crea un nuevo formulario y copia el ID (p. ej. `xpwqvkzb`)
3. Abre `js/main.js` y busca esta línea:
   ```js
   const FORMSPREE_ID = 'YOUR_FORM_ID';
   ```
4. Sustitúyela por tu ID real:
   ```js
   const FORMSPREE_ID = 'xpwqvkzb';
   ```
5. Listo. El formulario empezará a enviar mensajes a `cristalclaro04@gmail.com`.

**Opción B — EmailJS (alternativa gratuita):**
- También gratuita hasta 200 emails/mes. Ver documentación en [emailjs.com](https://emailjs.com).

### 3. Verificar datos legales

Los textos de `privacidad.html`, `aviso-legal.html` y `cookies.html` son modelos orientativos. Antes de publicar:
- Revísalos con un profesional legal si procede
- Añade los datos fiscales y empresariales del titular
- Actualiza la fecha de última modificación

### 4. Dominio y hosting

Para publicar la web:
- **Firebase Hosting** (gratuito): `firebase deploy`
- **Netlify** (gratuito): arrastra la carpeta a [netlify.com/drop](https://netlify.com/drop)
- **GitHub Pages** (gratuito): sube el repositorio y activa Pages
- Actualiza la URL `https://cristalclaro.es/` en `sitemap.xml` e `index.html` (meta og:url)

### 5. Confirmar WhatsApp

El botón flotante de WhatsApp apunta al número 665 696 451. Confirma con el cliente que ese número tiene WhatsApp activo antes de publicar.

### 6. Confirmar el correo electrónico

El correo `cristalclaro04@gmail.com` se muestra en el footer y en la sección de contacto. Verifica que es correcto antes de publicar.

---

## 🚀 Cómo ver la web en local

Abre `index.html` directamente en el navegador, o usa un servidor local:

```bash
# Con Python (recomendado)
python3 -m http.server 3000
# Abre: http://localhost:3000

# Con Node.js (npx)
npx -y serve .
```

---

## 🎨 Identidad de marca

| Token | Valor |
|---|---|
| Color principal | `#111820` — Negro carbón |
| Color acento | `#08C9E8` — Azul turquesa |
| Color fondo | `#F4F7FA` — Gris claro |
| Blanco | `#FFFFFF` |
| Tipografía | Inter (Google Fonts) |

---

*Desarrollado para Cristal Claro · Las Palmas de Gran Canaria*
