import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between">
                <Link href="/" className="text-white text-lg font-bold hover:underline">
                    Home
                </Link>
                <Link href="/favorites" className="text-white text-lg font-bold hover:underline">
                    Favoritos
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
