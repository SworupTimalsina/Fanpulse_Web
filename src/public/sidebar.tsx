const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
            <h2 className="text-2xl font-bold mb-4">🏀 Sports Blog</h2>
            <nav className="space-y-4">
                <a href="/dashboard" className="block text-lg font-semibold text-gray-700 hover:text-blue-600">
                    🏠 Home
                </a>
                <a href="/article" className="block text-lg font-semibold text-gray-700 hover:text-blue-600">
                    ✍️ Write Article
                </a>
                <a href="/messages" className="block text-lg font-semibold text-gray-700 hover:text-blue-600">
                    💬 Messages
                </a>
            </nav>
        </aside>
    );
};

export default Sidebar;
