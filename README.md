# TaskMaster - Aplicación de Gestión de Tareas

TaskMaster es una aplicación web de gestión de tareas que permite a los usuarios administrar sus proyectos y tareas de manera eficiente. La aplicación está construida con React, Zustand para la gestión del estado, TailwindCSS para los estilos y React Router para la navegación.

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **Zustand**: Gestión de estado simple y eficiente
- **TailwindCSS**: Framework CSS para diseño rápido y consistente
- **React Router**: Navegación entre páginas
- **Heroicons**: Iconos SVG
- **date-fns**: Manipulación de fechas

## Decisiones Técnicas

- **Zustand sobre Redux**: Se eligió Zustand por su simplicidad y menor boilerplate, manteniendo un rendimiento óptimo.
- **TailwindCSS**: Proporciona un sistema de diseño consistente y facilita la creación de interfaces responsive.
- **Persistencia de Datos**: Se implementó usando el middleware persist de Zustand para almacenar datos en localStorage.

## Cómo Ejecutar el Proyecto

### Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. Clonar el repositorio o descargar los archivos

2. Instalar dependencias:
   ```
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```
   npm run dev
   ```

4. Abrir el navegador en `http://localhost:5173`

### Compilación para Producción

```
npm run build
```

## Mejoras Futuras

- Implementación de notificaciones push para tareas próximas a vencer
- Añadir pruebas unitarias y e2e
- Integración con una API real (Firebase o Supabase)
- Funcionalidad de arrastrar y soltar para reordenar tareas
- Etiquetas personalizadas para tareas