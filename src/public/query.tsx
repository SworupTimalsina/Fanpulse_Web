import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// ✅ REGISTER
export const useRegister = () => {
    return useMutation({
        mutationKey: ["REGISTER_USER"],
        mutationFn: (data: {
            name: string;
            phone: string;
            image: any;
            email: string;
            username: string;
            password: string;
        }) => axios.post("http://localhost:3000/api/v1/auth/register", data),
    });
};

// ✅ LOGIN
export const useLogin = () => {
    return useMutation({
        mutationKey: ["LOGIN_USER"],
        mutationFn: (data: { email: string; password: string }) => {
            return axios.post("http://localhost:3000/api/v1/auth/login", data);
        },
    });
};

// ✅ CREATE ARTICLE
export const useCreateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["CREATE_ARTICLE"],
        mutationFn: (data: { title: string; content: string; image?: string }) =>
            axios.post(`http://localhost:3000/api/v1/article/add`, data, {
                headers: { "Content-Type": "application/json" },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["GET_ARTICLES"] });
        },
    });
};

// ✅ GET ALL ARTICLES
export const useGetArticles = () => {
    return useQuery({
        queryKey: ["GET_ARTICLES"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/api/v1/article");
            console.log("API Response:", res.data); // Debugging API response
            return res.data.data || []; // ✅ Extract `data` array properly
        },
    });
};


// ✅ GET ARTICLES OF LOGGED-IN USER
export const useGetUserArticles = (userId: string) => {
    return useQuery({
        queryKey: ["GET_USER_ARTICLES", userId],
        queryFn: async () => {
            if (!userId) return []; // ✅ Ensure an array is returned if userId is missing
            const res = await axios.get(`http://localhost:3000/api/v1/article/user/${userId}`);
            return res.data.data || []; // ✅ Ensure an array is always returned
        },
        enabled: !!userId, // Fetch only if userId exists
    });
};
// ✅ GET ARTICLE BY ID
export const useGetArticleById = (id: string) => {
    return useQuery({
        queryKey: ["GET_ARTICLE", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/api/v1/article/${id}`);
            return res.data.data || res.data; // Ensure the correct structure
        },
        enabled: !!id, // Fetch only when ID is available
    });
};


// ✅ UPDATE ARTICLE
export const useUpdateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["UPDATE_ARTICLE"],
        mutationFn: (data: { id: string; title: string; content: string; image?: string }) =>
            axios.put(`http://localhost:3000/api/v1/article/${data.id}`, data, {
                headers: { "Content-Type": "application/json" },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["GET_ARTICLES"] });
            queryClient.invalidateQueries({ queryKey: ["GET_USER_ARTICLES"] });
        },
    });
};

// ✅ DELETE ARTICLE
export const useDeleteArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["DELETE_ARTICLE"],
        mutationFn: (id: string) => axios.delete(`http://localhost:3000/api/v1/article/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["GET_ARTICLES"] });
            queryClient.invalidateQueries({ queryKey: ["GET_USER_ARTICLES"] });
        },
    });
};

// ✅ SEND MESSAGE
export const useSendMessage = () => {
    return useMutation({
        mutationKey: ["SEND_MESSAGE"],
        mutationFn: async (messageData: { senderId: string; receiverId: string; text: string }) => {
            const res = await axios.post("http://localhost:3000/api/v1/message/send", messageData);
            return res.data;
        },
    });
};

export const useGetMessages = (userId: string, currentUserId: string) => {
    return useQuery({
        queryKey: ["GET_MESSAGES", userId, currentUserId],
        queryFn: async () => {
            if (!userId || !currentUserId) return [];
            const res = await axios.get(
                `http://localhost:3000/api/v1/message/${userId}?currentUserId=${currentUserId}`
            );
            return res.data.messages || [];
        },
        enabled: !!userId && !!currentUserId, // ✅ Fetch only if both IDs exist
    });
};


// ✅ GET MESSAGES USING conversationId
export const useGetMessagesByConversation = (conversationId: string) => {
    return useQuery({
        queryKey: ["GET_MESSAGES_BY_CONVERSATION", conversationId],
        queryFn: async () => {
            if (!conversationId) return [];
            const res = await axios.get(`http://localhost:3000/api/v1/message/conversation/${conversationId}`);
            return res.data.messages || [];
        },
        enabled: !!conversationId, // Fetch only if conversationId exists
    });
};

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ["GET_ALL_USERS"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/api/v1/auth/users");
            return res.data.users || [];
        },
    });
};
