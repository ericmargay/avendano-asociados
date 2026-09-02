# Avendaño Abogados

Sitio web de **Avendaño Abogados**, despacho de litigantes con
sede en la Ciudad de México.

## La firma

Avendaño Abogados nació en 2009 con una idea sencilla: que quien confía un
problema legal hable siempre con el abogado que lo va a defender, y no con un
intermediario. Somos un equipo consolidado —ni un despacho de escritorio ni una
fábrica de expedientes— con la estructura para responder a asuntos de peso y la
disciplina para tratar cada uno como si fuera el único.

Trabajamos el litigio con el sistema acusatorio y oral como terreno natural:
preparamos audiencias, construimos teoría del caso y comparecemos personalmente
ante las instancias que resuelven cada materia, en la Ciudad de México y, cuando
el asunto lo exige, en el resto del país.

### Áreas de práctica

- **Penal** — defensa y asesoría en el sistema acusatorio, del inicio de carpeta al juicio oral; amparo penal y asesoría a víctimas.
- **Amparo y judicial** — juicio de amparo directo e indirecto, suspensión del acto reclamado y recursos ante el Poder Judicial de la Federación.
- **Familiar** — divorcio, guarda y custodia, pensiones alimenticias, convivencias y sucesiones.
- **Mercantil** — cobro de adeudos, títulos de crédito y juicios ejecutivos y ordinarios mercantiles.
- **Civil** — contratos, arrendamientos, responsabilidad civil, propiedad y posesión.
- **Laboral** — representación del trabajador y del patrón ante los Tribunales Laborales y el Centro Federal de Conciliación.

### Contacto

- **Oficinas:** World Trade Center, Montecito 38, Col. Nápoles, Benito Juárez, 03810, CDMX
- **Horario:** Lunes a viernes, 9:00 – 19:00 h
- **Atención en línea** mediante el chat del sitio

---

## Acerca de este sitio

Sitio estático (HTML, CSS y JavaScript, sin frameworks ni build). Listo para
publicarse en GitHub Pages.

```
├── index.html          Página única con todas las secciones
├── _posts/             Notas editables en Markdown
├── _layouts/post.html  Plantilla de cada nota y metadatos para redes
├── .pages.yml          Configuración del editor Pages CMS
├── css/styles.css      Estilos (paleta, tipografía, responsive)
├── js/main.js          Menú móvil, animaciones, chat, validación
├── assets/img/         Favicon, imagen social y fotos del equipo
└── README.md
```

### Ver en local

```bash
python3 -m http.server 5173
# abre http://localhost:5173
```

Las notas usan Jekyll. Para renderizarlas localmente con sus páginas individuales,
ejecuta `bundle exec jekyll serve` si tienes Jekyll instalado.

### Editor de notas

Las publicaciones se administran desde [Pages CMS](https://app.pagescms.org/).
Inicia sesión con GitHub, instala la aplicación para este repositorio y abre
`ericmargay/avendano-asociados`. Cualquier integrante con acceso de escritura al
repositorio podrá crear o editar notas, elegir su materia y subir una miniatura.
Cada guardado genera un commit y activa automáticamente GitHub Pages.

### Publicar en GitHub Pages

1. En **Settings → Pages**, en *Build and deployment*, elige **Deploy from a
   branch**.
2. Rama `main`, carpeta `/ (root)`. Guarda.
3. En un par de minutos el sitio queda en `https://<usuario>.github.io/<repo>/`.
4. Para dominio propio (p. ej. `avendanoasociados.mx`), agrega un archivo
   `CNAME` con el dominio y configúralo en tu proveedor de DNS.

### Pendientes antes del lanzamiento definitivo

- **Datos de contacto** — confirmar piso/oficina exactos, teléfono y correo del pie.
- **Equipo** — incorporar los perfiles de los demás integrantes cuando se confirmen.
- **Fotografía de Alejandro** — reemplazar el monograma temporal `AA` por el retrato aprobado.
- **Chat** — hoy es una simulación en `js/main.js` con el estilo de Zendesk;
  para el chat real, pega el snippet del *Web Widget* de Zendesk y elimina el
  bloque `<div class="zchat">`.
- **Aviso de Privacidad** — requerido por la LFPDPPP; enlazar a la página real.

---

© Avendaño Abogados. Todos los derechos reservados.
