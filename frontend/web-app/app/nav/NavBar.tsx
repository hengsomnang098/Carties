import React from 'react';
import { AiOutlineCar } from 'react-icons/ai';


export default function NavBar() {
    return (
        <header className=' sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md'>
            <div className='flex items-center gap-2 text-3xl font-semibold text-red-700'>
                <AiOutlineCar size={34} />
                <div>
                    Carsties Auctions
                </div>
            </div>
            <div>Middle</div>
            <div>Right</div>
        </header>
    )
}
