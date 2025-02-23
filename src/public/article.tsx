import { useState } from "react";
import Sidebar from "./sidebar";
import {
    useCreateArticle,
    useGetUserArticles,
    useUpdateArticle,
    useDeleteArticle
} from "../public/query";

const ArticleEditor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [editArticleId, setEditArticleId] = useState<string | null>(null); // Track article being edited

    const userId = localStorage.getItem("userId");
    const createArticleMutation = useCreateArticle();
    const { data: articles, isLoading } = useGetUserArticles(userId || "");
    const updateArticleMutation = useUpdateArticle();
    const deleteArticleMutation = useDeleteArticle();

    // Convert Image to Base64
    const convertToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle Image Upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            try {
                const base64String = await convertToBase64(file);
                setImageBase64(base64String);
            } catch (error) {
                console.error("Error converting image to Base64", error);
            }
        }
    };

    // Remove Image
    const handleRemoveImage = () => {
        setPreview(null);
        setImageBase64(null);
    };

    // Handle Form Submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert("User not logged in!");
            return;
        }

        const articleData = {
            title,
            content,
            image: imageBase64 || undefined,
            author: userId,
        };

        if (editArticleId) {
            updateArticleMutation.mutate(
                { id: editArticleId, title, content, image: imageBase64 || undefined },
                {
                    onSuccess: () => {
                        alert("✅ Article updated successfully!");
                        resetForm();
                    },
                }
            );
        } else {
            createArticleMutation.mutate(articleData, {
                onSuccess: () => {
                    alert("✅ Article created successfully!");
                    resetForm();
                },
            });
        }
    };

    // Reset form after submit
    const resetForm = () => {
        setTitle("");
        setContent("");
        setPreview(null);
        setImageBase64(null);
        setEditArticleId(null);
    };

    // Handle Edit
    const handleEdit = (article: any) => {
        setTitle(article.title);
        setContent(article.content);
        setPreview(article.image || null);
        setImageBase64(article.image || null);
        setEditArticleId(article._id);
    };

    // Handle Delete
    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            deleteArticleMutation.mutate(id);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <main className="flex-1 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-3xl font-semibold mb-4">📝 {editArticleId ? "Edit Article" : "Write an Article"}</h2>

                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg mb-4" />
                <textarea placeholder="Write your article..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-3 border rounded-lg h-40 mb-4"></textarea>

                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-3 border rounded-lg mb-4" />

                {preview && <img src={preview} alt="Preview" className="w-full h-60 object-cover rounded-lg border mb-4" />}
                {preview && <button onClick={handleRemoveImage} className="bg-red-500 text-white p-2 rounded">Remove Image</button>}

                <button onClick={handleSubmit} className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                    {createArticleMutation.isPending || updateArticleMutation.isPending ? "Submitting..." : editArticleId ? "Update Article" : "Submit Article"}
                </button>

                <h3 className="text-2xl font-semibold mt-6">📄 Your Articles</h3>
                {isLoading ? <p>Loading...</p> : articles?.map((article: any) => (
                    <div key={article._id} className="p-4 border rounded-lg shadow my-2">
                        <h3>{article.title}</h3>
                        <button onClick={() => handleEdit(article)}>Edit</button>
                        <button onClick={() => handleDelete(article._id)}>Delete</button>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default ArticleEditor;
