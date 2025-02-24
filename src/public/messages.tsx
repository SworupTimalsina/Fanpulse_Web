import { useEffect, useState } from "react";
import { useGetAllUsers, useGetMessages, useSendMessage } from "../public/query";

const ChatPage = () => {
    const { data: users, isLoading: usersLoading } = useGetAllUsers();
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [messageText, setMessageText] = useState("");

    const loggedInUserId = localStorage.getItem("userId") || "";

    // Fetch messages
    const {
        data: messages,
        isLoading: messagesLoading,
        refetch, // ✅ This will be used to refresh messages dynamically
    } = useGetMessages(selectedUser || "", loggedInUserId);

    const sendMessageMutation = useSendMessage();

    // ✅ Auto refresh messages every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (selectedUser) {
                refetch(); // ✅ Re-fetch messages from the API
            }
        }, 3000); // ✅ Refresh every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [selectedUser, refetch]);

    const handleSendMessage = () => {
        if (!messageText.trim() || !selectedUser) return;

        sendMessageMutation.mutate(
            {
                senderId: loggedInUserId,
                receiverId: selectedUser,
                text: messageText,
            },
            {
                onSuccess: () => {
                    setMessageText(""); // Clear input
                    refetch(); // ✅ Immediately fetch new messages after sending
                },
            }
        );
    };

    return (
        <div className="flex h-screen">
            {/* Left Sidebar - Users List */}
            <div className="w-1/3 bg-gray-100 p-4 border-r">
                <h2 className="text-lg font-semibold mb-4">Users</h2>
                {usersLoading ? (
                    <p>Loading users...</p>
                ) : (
                    <ul>
                        {users?.map((user: { _id: string; name: string }) => (
                            <li
                                key={user._id}
                                className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${
                                    selectedUser === user._id ? "bg-blue-200" : ""
                                }`}
                                onClick={() => setSelectedUser(user._id)}
                            >
                                {user.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Right Side - Chat Window */}
            <div className="w-2/3 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto bg-white border-b">
                    {selectedUser ? (
                        messagesLoading ? (
                            <p>Loading messages...</p>
                        ) : (
                            <div>
                                {messages?.map((msg: { _id: string; senderId: string; text: string }) => {
                                    const isSender = msg.senderId === loggedInUserId;
                                    return (
                                        <div
                                            key={msg._id}
                                            className={`mb-2 ${isSender ? "text-right" : "text-left"}`}
                                        >
                                            <p
                                                className={`inline-block p-2 rounded-md ${
                                                    isSender ? "bg-blue-500 text-white" : "bg-gray-200"
                                                }`}
                                            >
                                                {msg.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    ) : (
                        <p className="text-gray-500">Select a user to start chatting</p>
                    )}
                </div>

                {/* Message Input */}
                {selectedUser && (
                    <div className="p-4 border-t flex">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 p-2 border rounded-md"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                            disabled={sendMessageMutation.isPending}
                        >
                            {sendMessageMutation.isPending ? "Sending..." : "Send"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
