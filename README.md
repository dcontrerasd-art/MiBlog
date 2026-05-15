# Proyecto Basico Con Node.js y Express

Este proyecto muestra como conectar:

- un backend con Node.js y Express
- una pagina HTML
- una ruta API que devuelve JSON
- un `fetch()` desde el frontend hacia el backend

## Estructura

```text
proyect/
|-- package.json
|-- server.js
|-- public/
|   |-- css/index.css
|   `-- js/main.js
`-- views/
    |-- index.html
    `-- about.html
```

## Pasos para ejecutarlo

1. Abre una terminal en la carpeta `proyect`
2. Instala dependencias con `npm install`
3. Inicia el servidor con `npm start`
4. Abre `http://localhost:3000`

## Flujo de la conexion

1. El navegador entra a `http://localhost:3000/`
2. Express responde con `views/index.html`
3. Ese HTML carga `/js/main.js`
4. Cuando haces clic en el boton, `fetch("/api/message")` envia una peticion al servidor
5. Express responde con JSON
6. El frontend lee ese JSON y lo muestra en pantalla
