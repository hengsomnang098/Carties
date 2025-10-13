'use client';
import { HiMenu, HiX } from 'react-icons/hi';
import Search from './Search';
import Logo from './Logo';
import LoginButton from './LoginButton';
import NavBarDesktop from './NavBarDesktop';
import { useCallback, useState } from 'react';
import { User } from 'next-auth';
import UserAction from './UserAction';

type NavMobileProps = {
    user: User | null;
}

export default function NavMobile({ user }: NavMobileProps) {
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);
    return (
        <>
            <nav className="flex items-center justify-between px-4 py-3 md:py-4">
                {/* Logo */}
                <Logo />

                {/* Hamburger Menu Button (Mobile) */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-700 focus:outline-none"
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>

                {/* Desktop Menu */}
                <NavBarDesktop user={user} />
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 p-4 bg-gray-100">
                    <Search />
                    <div className="text-gray-700 cursor-pointer">
                        {
                            user ? (
                                <UserAction user={user}/>
                            ) : (
                                <LoginButton />
                            )
                        }
                    </div>
                </div>
            )}
        </>
    )
}
