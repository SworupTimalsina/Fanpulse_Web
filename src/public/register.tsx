import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegister } from "../public/query"; // Import your useRegister hook

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
    const [isImageSelected, setIsImageSelected] = useState(false);
    const navigate = useNavigate();

    const { mutate } = useRegister(); // Call your custom mutation

    // Explicitly define the type of `e` for input change events
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Explicitly define the type of `e` for form submission events
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (
            !formData.name ||
            !formData.phone ||
            !formData.email ||
            !formData.username ||
            !formData.password
        ) {
            toast.error("Please fill out all required fields.");
            return;
        }

        const requestBody = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            image: profileImage, // Send the image file
        };

        mutate(requestBody, {
            onSuccess: () => {
                toast.success("Registration successful!");
                navigate("/dashboard"); // Redirect to login or homepage after successful registration
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Registration failed");
            },
        });
    };

    // Explicitly define the type of `e` for file input change events
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(URL.createObjectURL(file));
            setIsImageSelected(true);
        }
    };

    const handleNavigateToLogin = () => {
        navigate("/");
    };

    const handleProfileImageClick = () => {
        document.getElementById("profile-upload")?.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 flex justify-center items-center py-12">
            <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
                <div
                    className="hidden md:block w-1/2 bg-center"
                    style={{
                        backgroundImage:
                            "url('https://i.pinimg.com/736x/20/f0/51/20f051fef796da29c4ad36185ba3f209.jpg')",
                        backgroundSize: "auto",
                        backgroundPosition: "center",
                    }}
                ></div>

                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-8">
                        Create your account
                    </h2>

                    <div className="flex justify-center mb-6">
                        <div
                            onClick={handleProfileImageClick}
                            className="cursor-pointer relative group mb-4"
                        >
                            <img
                                src={
                                    isImageSelected
                                        ? profileImage || undefined // Convert null to undefined
                                        : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                }
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-200"
                            />
                            <input
                                type="file"
                                id="profile-upload"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute top-0 left-0 w-full h-full opacity-0"
                            />
                            {!isImageSelected && (
                                <div className="absolute bottom-0 left-0 w-full text-center text-sm font-semibold text-gray-500 opacity-100 transition-all duration-300 bg-white py-1 rounded-b-md">
                                    Insert Your Image
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={handleNavigateToLogin}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4 rounded-lg hover:bg-gradient-to-l transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </form>

                    <div className="flex justify-center items-center mt-6 text-sm">
                        <button
                            onClick={handleNavigateToLogin}
                            className="text-blue-600 hover:underline focus:outline-none"
                        >
                            Already have an account? Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;