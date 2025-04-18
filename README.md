# App React normal y con Next.js

# Introducción

Para esta tarea se han realizado dos proyectos. El primero se llama peliculaspp-spa y es una SPA que utiliza React Router DOM para manejar las rutas en el cliente. 
El segundo se llama movieappnext y es un proyecto creado con Next.js con App Router para manejar el enrutamiento y aprovechar el enrutamiento en el servidor.

# peliculasapp-spa

## Enrutamiento
En App.jsx se ha realizado el enrutamiento con React Router DOM:
```
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/:id" element={<MovieDetail />} />
</Routes>
```

- Home (/): esta página muestra la lista de películas más populares con paginación integrada ya que la api de TMDB por defecto en cada página muestra 20 películas. Para ello se ha integrado una paginación con dos botones para avanzar y retroceder para que todo funcione correctamente. Además, en vez de crear una ruta para la búsqueda de películas, se ha integrado el buscador dentro de esta ruta y se actualiza la grid de películas dinámicamente haciendo peticiones a la api cuando se interactúa con el input.

- MovieDetail (/:id): una vez se hace click en una de las películas de la página principal, la web pasa a una ruta dinámica con el id de la película que muestra los detalles de esta. Además, se ha integrado un botón de "Atrás" con el hook useNavigate() para asegurar una correcta navegación por la app.

## Componentes

Se ha creado un componente MovieCard para mostrar cada película que devuelve la petición a la api en el Home y mostrarlos en una grid, que irá cambiando dinámicamente si se utiliza el buscador.

## Conexión con la api

Se ha creado un script "connection_api.js" para realizar las peticiones a la api, las cuales se fundamentan en 3:

- fetchPopularMovies: petición para sacar las 20 películas más populares de una página en concreto.

- fetchMovieDetail: petición para sacar los detalles de una película en concreto.

- searchMovies: petición que se realiza al interactuar con el buscador y que permite buscar las películas según lo especificado en este.

Se ha metido la api key de la api en el .env.

# movieappnext

Esta vez se ha realizado el proyecto con TypeScript para cambiar con respecto al otro proyecto.

## Enrutamiento

Se ha utilizado el App Router que proporciona Next.js para manejar las rutas de la aplicación en el lado del cliente.
```
src
├── app/                        # Carpeta principal con App Router
│   ├── layout.tsx             # Layout global (estructura general)
│   ├── page.tsx               # Página principal (/)
│   ├── page.module.css        
│   ├── [id]/                  # Ruta dinámica para detalles de película
│   │   ├── page.tsx           # Detalle de una película
│   │   └── MovieDetail.module.css
│
├── components/                # Componentes reutilizables
│   ├── MovieCard.tsx
│   └── MovieCard.module.css
│
├── lib/                       # Lógica de conexión (API)
│   └── connection_api.ts
│
├── globals.css                   # Estilos globales 
│
├── types/                     # Tipos TypeScript
    └── types.ts
```
Aunque se haya realizado de formas diferentes, las dos rutas tienen la misma funcionalidad que en el otro proyecto, en el Home se muestra el grid con las películas más populares con paginación y buscador y cuando se hace click en una se muestran los detalles de esta en otra página con enrutamiento dinámico.

## Componentes

De la misma forma, se ha creado un componente MovieCard que ocupa la misma funcionalidad.

## Conexión con la api

Dentro de lib se encuentra el script "connection_api.js" que contiene los mismos tipos de peticiones que, aunque no son exactamente iguales, cumplen la misma función.

## Types

Se han creado dos tipos: uno para el género y otro para las películas, que utiliza el primero. El tipo películas se utiliza para recoger como un array de este tipo de objetos las películas que devuelve la api.

## Optimización desde el servidor

En Next.js con el App Router los componentes por defecto se renderizan desde el servidor, mejorando el rendimiento y la seguridad entre otras ventajas. Para los componentes que necesitan utilizar hooks de React o manejar eventos de cliente, se ha utilizado la sintaxis "use client" al principio del script para convertirlos en Client Components.