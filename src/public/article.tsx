import { useState } from "react";
import Sidebar from "./sidebar.tsx";

const ArticleEditor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 max-w-3xl mx-auto p-6">
                <h2 className="text-3xl font-semibold mb-4">Write an Article</h2>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg mb-4" />
                <textarea placeholder="Write your article..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-3 border rounded-lg h-40"></textarea>
                <button className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
            </main>
        </div>
    );
};

export default ArticleEditor;
