
import React from 'react';
import NavBarMobile from './NavMobile';
import { getCurrentUser } from '../actions/authAcation';




export default async function NavBar() {
    const user = await getCurrentUser();

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <NavBarMobile user={user} />
        </header>
    );
}