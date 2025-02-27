import React, { useState } from "react";
import { FaCamera, FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegister } from "../public/query";

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { mutate } = useRegister();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (!formData.name || !formData.phone || !formData.email || !formData.username || !formData.password) {
            toast.error("Please fill out all required fields.");
            return;
        }

        const requestBody = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            image: profileImage,
        };

        mutate(requestBody, {
            onSuccess: () => {
                toast.success("Registration successful!");
                navigate("/dashboard");
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Registration failed");
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-red-600 to-blue-600 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Fan<span className="text-blue-600">Pulse</span>
                </h2>

                <div className="flex justify-center mb-4 relative">
                    <div className="relative w-24 h-24">
                        <img
                            src={profileImage || "https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-623.jpg"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow cursor-pointer">
                            <FaCamera />
                        </label>
                        <input type="file" id="profile-upload" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                        <span className="px-3 text-gray-500"><FaUser /></span>
                        <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required className="w-full px-3 py-2 focus:outline-none text-gray-700" />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                        <span className="px-3 text-gray-500"><FaPhone /></span>
                        <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} required className="w-full px-3 py-2 focus:outline-none text-gray-700" />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                        <span className="px-3 text-gray-500"><FaEnvelope /></span>
                        <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} required className="w-full px-3 py-2 focus:outline-none text-gray-700" />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                        <span className="px-3 text-gray-500"><FaUser /></span>
                        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} required className="w-full px-3 py-2 focus:outline-none text-gray-700" />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                        <span className="px-3 text-gray-500"><FaLock /></span>
                        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required className="w-full px-3 py-2 focus:outline-none text-gray-700" />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                        <span className="px-3 text-gray-500"><FaLock /></span>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} required className="w-full px-3 py-2 focus:outline-none text-gray-700" />
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Register
                    </button>
                </form>

                <div className="flex justify-between items-center mt-6 text-sm">
                    <button onClick={() => navigate("/")} className="text-blue-600 hover:underline focus:outline-none">
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
