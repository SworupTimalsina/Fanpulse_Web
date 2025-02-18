import { Heart, MessageCircle, PlusCircle, Send } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";

// Define types
type Comment = {
    user: string;
    text: string;
};

type Post = {
    id: number;
    user: string;
    avatar: string;
    content: string;
    image: string;
    likes: number;
    liked: boolean;
    comments: Comment[];
};

// Sample posts
const initialPosts: Post[] = [
    {
        id: 1,
        user: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        content: "🏀 What a game last night! The energy in the stadium was insane!",
        image: "https://source.unsplash.com/600x400/?sports",
        likes: 12,
        liked: false,
        comments: [],
    },
    {
        id: 2,
        user: "Emily Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        content: "⚽ The Champions League final is coming up! Predictions? 🏆",
        image: "https://source.unsplash.com/600x400/?soccer",
        likes: 20,
        liked: false,
        comments: [],
    },
];

const HomePage = () => {
    const [feed, setFeed] = useState<Post[]>(initialPosts);
    const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

    // Handle Like / Unlike
    const handleLike = (postId: number) => {
        setFeed(feed.map(post =>
            post.id === postId
                ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };

    // Handle typing a comment
    const handleCommentChange = (postId: number, text: string) => {
        setCommentInputs({ ...commentInputs, [postId]: text });
    };

    // Add comment
    const handleAddComment = (postId: number) => {
        if (!commentInputs[postId]?.trim()) return;

        setFeed(feed.map(post =>
            post.id === postId
                ? { ...post, comments: [...post.comments, { user: "You", text: commentInputs[postId] }] }
                : post
        ));

        setCommentInputs({ ...commentInputs, [postId]: "" });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">🏆 Sports Feed</h1>

                {/* Posts */}
                {feed.map(post => (
                    <div key={post.id} className="bg-white shadow-md rounded-xl p-6 mb-6">
                        {/* User Info */}
                        <div className="flex items-center mb-4">
                            <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                            <h3 className="font-semibold text-lg">{post.user}</h3>
                        </div>

                        {/* Post Content */}
                        <p>{post.content}</p>
                        {post.image && (
                            <img src={post.image} alt="Post" className="w-full mt-4 rounded-lg" />
                        )}

                        {/* Like & Comment Section */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => handleLike(post.id)}
                                className={`flex items-center ${post.liked ? "text-red-500" : "text-gray-600"} hover:text-red-500 transition`}
                            >
                                <Heart className="w-5 h-5 mr-1" /> {post.likes} Likes
                            </button>
                            <button className="flex items-center text-gray-600 hover:text-blue-500">
                                <MessageCircle className="w-5 h-5 mr-1" /> {post.comments.length} Comments
                            </button>
                        </div>

                        {/* Comments */}
                        {post.comments.map((comment, index) => (
                            <p key={index} className="text-sm text-gray-700 mt-2">
                                <strong>{comment.user}:</strong> {comment.text}
                            </p>
                        ))}

                        {/* Comment Input */}
                        <div className="mt-4 flex">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={commentInputs[post.id] || ""}
                                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                className="flex-1 p-2 border rounded-lg"
                            />
                            <button
                                onClick={() => handleAddComment(post.id)}
                                className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </main>

            {/* Floating Button to Write Article */}
            <a
                href="/write"
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition"
            >
                <PlusCircle className="w-6 h-6" />
            </a>
        </div>
    );
};

export default HomePage;
