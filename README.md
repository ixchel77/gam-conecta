# 🌐 GAM Conecta

**GAM Conecta** es una plataforma web de innovación social y cívica desarrollada para centralizar y democratizar el acceso a la información pública de la Alcaldía Gustavo A. Madero en la Ciudad de México. El sistema conecta de manera ágil e intuitiva a los habitantes con servicios comunitarios, de salud, educación, alimentación y desarrollo social.

🔗 **Sitio en vivo (GitHub Pages):** [https://ixchel77.github.io/gam-conecta/](https://ixchel77.github.io/gam-conecta/)

---

## 📌 Características Principales

- **Directorio verificado**: Centraliza 86 servicios comunitarios distribuidos en 5 categorías fundamentales:
  - 🟢 *Salud y bienestar*
  - 🔴 *Salud sexual y reproductiva*
  - 🟠 *Alimentación y apoyo*
  - 🟣 *Educación y capacitación*
  - 🟢 *Juventud y deporte*
- **Navegación dinámica de dos niveles**: Organización por Categorías y Subcategorías para facilitar la localización de recursos.
- **Búsqueda en tiempo real**: Filtrado por texto rápido e intuitivo sobre la base de datos de servicios.
- **Interactividad y transparencia**: Enlaces directos a ubicaciones institucionales en Google Maps y fuentes oficiales.
- **Módulo de Contacto y Feedback**: Formulario/canalización para retroalimentación comunitaria y canalización con el servicio social.
- **Diseño responsivo**: Desarrollado con tecnologías estándar web, adaptable a dispositivos móviles y de escritorio.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la plataforma.
- **CSS3**: Maquetación adaptativa, estilos visuales y tarjetas interactivas.
- **JavaScript (Vanilla JS)**: Lógica de renderizado dinámico, submenús interactivas y filtrado en tiempo real.
- **JSON**: Almacenamiento estructurado de la base de datos del directorio (`data/servicios.json`).

---

## 📂 Estructura del Proyecto

```text
gam-conecta/
├── css/
│   └── style.css         # Estilos visuales del proyecto
├── data/
│   └── servicios.json    # Base de datos estructurada con 86 servicios
├── js/
│   └── app.js            # Lógica de renderizado dinámico y filtros
├── index.html            # Estructura principal (Buscador, Categorías, Acerca de/Contacto)
└── README.md             # Documentación del repositorio