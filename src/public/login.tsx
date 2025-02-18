import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../public/query";

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const loginMutation = useLogin();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(formData, {
            onSuccess: (data) => {
                console.log("Login Success:", data);
                localStorage.setItem("token", data.data.token);
                navigate("/dashboard");
            },
            onError: (error) => {
                console.error("Login Failed:", error);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Stock<span className="text-orange-600">Vision</span>
                </h2>

                {loginMutation.isError && (
                    <div className="text-red-500 text-center mb-4">
                        Login failed. Please check your credentials.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            email
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                            <span className="px-3 text-gray-500">
                                <FaUser />
                            </span>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 focus:outline-none text-gray-700"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                            <span className="px-3 text-gray-500">
                                <FaLock />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 focus:outline-none text-gray-700"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="px-3 text-gray-500 focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Links */}
                <div className="flex justify-between items-center mt-6 text-sm">
                    <button
                        onClick={() => navigate("/forget-password")}
                        className="text-orange-600 hover:underline focus:outline-none"
                    >
                        Forgot Password?
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="text-orange-600 hover:underline focus:outline-none"
                    >
                        Create an Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;