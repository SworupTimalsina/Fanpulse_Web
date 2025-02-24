import { useGetArticles } from "../public/query"; // Ensure correct path
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";

const AllArticles = () => {
    const { data: articles = [], isLoading, isError } = useGetArticles();

    // Debugging: Check fetched data
    console.log("Articles in UI:", articles);

    return (
        <div className="flex min-h-screen bg-gray-100 p-6">
            <Sidebar />

            <div className="max-w-4xl mx-auto w-full bg-white p-6 shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold mb-6">📰 All Articles</h1>


                {/* Conditional Loading/Error Handling */}
                {isLoading && <p className="text-blue-500 text-center">Loading articles...</p>}
                {isError && <p className="text-red-500 text-center">⚠️ Failed to load articles.</p>}

                {/* Articles List */}
                {articles.length === 0 ? (
                    <p className="text-gray-500 text-center">No articles found.</p>
                ) : (
                    <div className="space-y-6">
                        {articles.map((article: any) => (
                            <div
                                key={article._id}
                                className="border p-4 rounded-lg shadow-md bg-gray-50 transition transform hover:scale-105"
                            >
                                {/* Article Image with Fallback */}
                                <img
                                    src={article.image || "https://via.placeholder.com/600x300?text=No+Image"}
                                    alt={article.title}
                                    className="w-full h-60 object-cover rounded-md mb-4"
                                />

                                {/* Article Title */}
                                <h2 className="text-2xl font-semibold">{article.title}</h2>

                                {/* Content Preview */}
                                <p className="text-gray-700">
                                    {article.content?.substring(0, 150)}...
                                </p>

                                {/* Read More Button */}
                                <Link
                                    to={`/article/${article._id}`}
                                    className="text-blue-500 hover:underline mt-2 inline-block font-medium"
                                >
                                    Read More →
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllArticles;
