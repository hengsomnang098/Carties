import React from 'react';
import Search from './Search';
import Logo from './Logo';


export default function NavBar() {
    return (
        <header className=' sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md'>
            <Logo />
            <Search />
            <div>Login</div>
        </header>
    )
}
