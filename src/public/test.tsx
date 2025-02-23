import { useGetArticles } from "./query";

const AllArticlesPage = () => {
    const { data, isLoading, error } = useGetArticles();
    const articles = data?.data || [];

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p>Error fetching articles: {error.message}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">All Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {console.log("Rendering articles:", articles)}
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article._id || article.title} className="border bg-gray-100 p-4 shadow-md">
                            <h2 className="text-xl font-semibold">{article.title}</h2>
                            {article.image && (
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-40 object-cover rounded mt-2"
                                />
                            )}
                            <p className="text-gray-600 mt-2">{article.content.substring(0, 100)}...</p>
                            <a
                                href={`/article/${article._id}`}
                                className="text-blue-500 mt-2 inline-block"
                            >
                                Read more
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No articles found.</p>
                )}
            </div>
        </div>
    );
};

export default AllArticlesPage;
