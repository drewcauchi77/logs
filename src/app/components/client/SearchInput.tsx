"use client"

import { SearchInputProps } from "@/app/types/definitions";

const SearchInput = ({ searchTerm, setSearchTerm }: SearchInputProps) => (
    <div className="relative flex-grow">
        <input 
            type="text"
            className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Search logs..." 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target?.value ?? '')}
            value={searchTerm}
        />
        <button 
            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded" 
            type="button"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-slate-600">
                <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </button>
    </div>
);

export default SearchInput;