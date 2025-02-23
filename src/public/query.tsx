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
        queryFn: () =>
            axios.get(`http://localhost:3000/api/v1/article`).then((res) => {
                console.log("Fetched Articles:", res.data); // Debugging
                return Array.isArray(res.data) ? res.data : []; // Ensure it's an array
            }),
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
        queryFn: () => axios.get(`http://localhost:3000/api/v1/article/${id}`).then((res) => res.data),
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
