'use client'
import { useParamsStore } from '@/hooks/useParamStore'
import { ChangeEvent, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Search() {
    const setParams = useParamsStore(state => state.setParams);
    const searchParams = useParamsStore(state => state.searchTerm);
    const [value, setValue] = useState('');

    useEffect(()=>{
        if(searchParams === ''){
            setValue('');
        } else {
            setValue(searchParams);
        }
    },[searchParams])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function handleSearch(){
        setParams({ searchTerm: value });
    }

    return (
        <>
            <div className="flex w-[50%] items-center border-2 border-gray-300 rounded-full py-2 shadow-sm">
                <input
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            handleSearch();
                        }
                    }}
                    onChange={handleChange}
                    value={value}
                    type="text"
                    placeholder="Search for cars by make, model or color"
                    className="
                input-custom
                text-sm
                text-gray-600
            "
                />
                <button
                onClick={handleSearch}
                type="submit" title="Search" aria-label="Search">
                    <FaSearch size={34}
                        className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2" />
                </button>
            </div>
        </>
    )
}
