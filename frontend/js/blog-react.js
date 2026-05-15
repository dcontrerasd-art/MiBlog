const e = React.createElement;

function ArticleCard({ article, featured, onToggleFeatured }) {
    return e(
        "article",
        {
            className: featured ? "article-card article-card--featured" : "article-card"
        },
        e("img", {
            src: article.image,
            alt: article.alt,
            className: "img1"
        }),
        e(
            "div",
            { className: "article-card__content" },
            e(
                "div",
                { className: "article-card__meta" },
                e("span", { className: "article-tag" }, article.category),
                e(
                    "button",
                    {
                        type: "button",
                        className: featured ? "feature-button is-active" : "feature-button",
                        onClick: () => onToggleFeatured(article.id)
                    },
                    featured ? "Destacado" : "Destacar"
                )
            ),
            e("h3", null, article.title),
            e("p", null, article.summary),
            e(
                "footer",
                null,
                e("p", null, `Publicado el: ${article.date}`)
            )
        )
    );
}

function BlogApp() {
    const [search, setSearch] = React.useState("");
    const [featuredId, setFeaturedId] = React.useState(1);
    const [articles, setArticles] = React.useState([]);
    const [serverMessage, setServerMessage] = React.useState("Cargando mensaje del servidor...");
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        async function loadBlogData() {
            try {
                const [messageResponse, articlesResponse] = await Promise.all([
                    fetch("/api/message"),
                    fetch("/api/articles")
                ]);

                if (!messageResponse.ok || !articlesResponse.ok) {
                    throw new Error("No se pudieron cargar los datos del blog.");
                }

                const messageData = await messageResponse.json();
                const articlesData = await articlesResponse.json();

                setServerMessage(messageData.message);
                setArticles(articlesData);
                setFeaturedId(articlesData[0] ? articlesData[0].id : null);
            } catch (fetchError) {
                setError(fetchError.message);
            } finally {
                setLoading(false);
            }
        }

        loadBlogData();
    }, []);

    const filteredArticles = articles.filter((article) => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return true;
        }

        return (
            article.title.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query) ||
            article.summary.toLowerCase().includes(query)
        );
    });

    const featuredArticle = articles.find((article) => article.id === featuredId);

    return e(
        React.Fragment,
        null,
        e(
            "section",
            { className: "hero" },
            e(
                "div",
                { className: "hero__copy" },
                e("p", { className: "eyebrow" }, "Blog Reactivo"),
                e("h2", null, "Explora el universo Koenigsegg con una capa de React"),
                e(
                    "p",
                    { className: "hero__text" },
                    error || serverMessage
                )
            ),
            featuredArticle
                ? e(
                      "aside",
                      { className: "hero__panel" },
                      e("span", { className: "hero__panel-label" }, "Modelo destacado"),
                      e("strong", null, featuredArticle.title),
                      e("p", null, featuredArticle.summary)
                  )
                : null
        ),
        e(
            "section",
            { className: "toolbar", "aria-label": "Filtros del blog" },
            e(
                "div",
                { className: "toolbar__search" },
                e("label", { htmlFor: "search-posts" }, "Buscar articulos"),
                e("input", {
                    id: "search-posts",
                    type: "search",
                    placeholder: "Jesko, GT, record...",
                    value: search,
                    onChange: (event) => setSearch(event.target.value)
                })
            ),
            e(
                "div",
                { className: "toolbar__stats" },
                e("span", null, `${filteredArticles.length} articulos visibles`),
                e(
                    "span",
                    null,
                    loading
                        ? "Cargando articulos..."
                        : `Destacado: ${featuredArticle ? featuredArticle.title : "Ninguno"}`
                )
            )
        ),
        e(
            "section",
            { id: "articles" },
            loading
                ? e(
                      "div",
                      { className: "empty-state" },
                      e("h3", null, "Cargando articulos"),
                      e("p", null, "Espera un momento mientras Express responde con los datos.")
                  )
                : filteredArticles.length
                ? filteredArticles.map((article) =>
                      e(ArticleCard, {
                          key: article.id,
                          article,
                          featured: article.id === featuredId,
                          onToggleFeatured: setFeaturedId
                      })
                  )
                : e(
                      "div",
                      { className: "empty-state" },
                      e("h3", null, "No encontramos articulos"),
                      e("p", null, "Prueba con otro termino para volver a ver los modelos disponibles.")
                  )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(e(BlogApp));
