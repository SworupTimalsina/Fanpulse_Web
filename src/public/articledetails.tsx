import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetArticleById } from "../public/query"; // Ensure this hook is properly implemented

const ArticleDetails = () => {
    const { id } = useParams(); // ✅ Get article ID from URL
    const { data: article, isLoading, isError } = useGetArticleById(id || "");
    const [articleData, setArticleData] = useState<any>(null); // ✅ Local state to store the article data

    // ✅ Effect to update local state when data is fetched
    useEffect(() => {
        if (article) {
            setArticleData(article);
        }
    }, [article]);

    console.log("Article Details in UI:", articleData); // Debugging

    return (
        <div className="flex min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto w-full bg-white p-6 shadow-lg rounded-xl">
                {/* Back Button */}
                <Link to="/test" className="text-blue-500 hover:underline text-sm">
                    ← Back to Articles
                </Link>


                {/* ✅ Conditional Loading/Error Handling */}
                {isLoading && <p className="text-blue-500 text-center">Loading article...</p>}
                {isError && <p className="text-red-500 text-center">⚠️ Failed to load article.</p>}
                {!articleData && !isLoading && !isError && <p className="text-gray-500 text-center">Article not found.</p>}

                {/* ✅ Display Article Content */}
                {articleData && (
                    <>
                        {/* Image */}
                        {articleData.image && (
                            <img
                                src={articleData.image}
                                alt={articleData.title}
                                className="w-full h-64 object-cover rounded-md mb-4"
                            />
                        )}

                        {/* Title */}
                        <h1 className="text-3xl font-bold">{articleData.title}</h1>

                        {/* Author */}
                        <p className="text-gray-600 text-sm mb-4">By {articleData.author?.name || "Unknown Author"}</p>

                        {/* Content */}
                        <p className="text-gray-700 leading-relaxed">{articleData.content}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ArticleDetails;
