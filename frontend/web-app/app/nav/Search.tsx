'use client';
import { useParamsStore } from '@/hooks/useParamStore';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
    const setParams = useParamsStore((state) => state.setParams);
    const searchParams = useParamsStore((state) => state.searchTerm);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (searchParams === '') {
            setValue('');
        } else {
            setValue(searchParams);
        }
    }, [searchParams]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function handleSearch() {
        setParams({ searchTerm: value });
    }

    return (
        <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-96">
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    onChange={handleChange}
                    value={value}
                    type="text"
                    placeholder="Search for cars by make, model, or color"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaSearch className="text-gray-400" />
                </div>
            </div>
            <button
                onClick={handleSearch}
                type="submit"
                title="Search"
                aria-label="Search"
                className="ml-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
                Search
            </button>
        </div>
    );
}