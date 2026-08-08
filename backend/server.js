const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const articles = [
    {
        id: 1,
        title: "Koenigsegg Jesko",
        image: "/img/jesko.jpg",
        alt: "Koenigsegg Jesko",
        category: "Hypercar",
        date: "17 de abril de 2026",
        summary: "El Attack usa un ala masiva para generar carga aerodinamica en curvas, mientras que el Absolut esta disenado para reducir la resistencia y buscar velocidad maxima."
    },
    {
        id: 2,
        title: "Koenigsegg Gemera",
        image: "/img/gemera1.jpg",
        alt: "Koenigsegg Gemera",
        category: "GT Hibrido",
        date: "17 de abril de 2026",
        summary: "El GT familiar definitivo. Tiene espacio real para cuatro adultos y un sistema hibrido con prestaciones de superdeportivo."
    },
    {
        id: 3,
        title: "Koenigsegg Agera RS",
        image: "/img/agera rs.jpg",
        alt: "Koenigsegg Agera RS",
        category: "Record",
        date: "17 de abril de 2026",
        summary: "El cazador de records. Su velocidad punta en carretera abierta lo convirtio en una leyenda moderna."
    },
    {
        id: 4,
        title: "Koenigsegg CC850",
        image: "/img/CC850.jpg",
        alt: "Koenigsegg CC850",
        category: "Heritage",
        date: "17 de abril de 2026",
        summary: "Un tributo al CC8S con una transmision ESS que puede sentirse como manual o automatica segun el modo seleccionado."
    },
    {
        id: 5,
        title: "Koenigsegg One:1",
        image: "/img/One1.jpg",
        alt: "Koenigsegg One:1",
        category: "Megacar",
        date: "17 de abril de 2026",
        summary: "Presentado en 2014, definio el concepto de megacar gracias a su relacion potencia-peso de 1:1."
    },
    {
        id: 6,
        title: "Koenigsegg Regera",
        image: "/img/regera.jpg",
        alt: "Koenigsegg Regera",
        category: "Grand Touring",
        date: "17 de abril de 2026",
        summary: "Un hibrido enchufable centrado en lujo y comodidad, famoso por su sistema de transmision directa sin caja tradicional."
    }
];


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/html/index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/html/about.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/html/contact.html"));
});

app.get("/api/message", (req, res) => {
    res.json({
        message: "Ahora el blog esta conectado a Node.js y Express.",
        totalArticles: articles.length
    });
});

app.get("/api/articles", (req, res) => {
    res.json(articles);
});

module.exports = app;