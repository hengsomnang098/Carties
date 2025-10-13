import React from 'react'
import Search from './Search'
import LoginButton from './LoginButton'
import { User } from 'next-auth';
import UserAction from './UserAction';

type NavMobileProps = {
    user: User | null;
}

export default function NavBarDesktop({ user }: NavMobileProps) {
    return (
        <div className="hidden md:flex items-center gap-6">
            <Search />
            <div className="text-gray-700 cursor-pointer">
                {
                    user ? (
                        <UserAction user={user} />
                    ) : (
                        <LoginButton />
                    )
                }
            </div>
        </div>
    )
}
