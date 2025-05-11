"use client"

import { MouseEvent as ReactMouseEvent } from "react";
import { capitaliseText, getColorsByLevel } from "@/app/helpers/helpers";
import { LevelFilterDropdownProps } from "@/app/types/definitions";

const LevelFilterDropdown = ({ levels, selectedLevels, toggleLevel, dropdownOpen, setDropdownOpen, dropdownRef }: LevelFilterDropdownProps) => (
    <div className="w-full md:w-1/3 lg:w-1/4 relative" ref={dropdownRef}>
        <div className="bg-white max-h-[40px] pl-3 py-2 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease cursor-pointer hover:border-slate-400 shadow-sm flex flex-wrap items-center gap-1"
            onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedLevels.length === 0 ? (
                <span className="text-slate-400">Select Type(s)</span>
            ) : (
                <>
                    {selectedLevels.map((level: string) => (
                        <div 
                            key={level} 
                            className={`flex items-center px-2 rounded-full border ${getColorsByLevel(level).backgroundColor} ${getColorsByLevel(level).borderColor} ${getColorsByLevel(level).textColor}`}
                            onClick={(e: ReactMouseEvent) => {
                                e.stopPropagation();
                                toggleLevel(level);
                            }}
                        >
                            <span className="mr-1">{capitaliseText(level)}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    ))}
                </>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
        
        {dropdownOpen && (
            <div className="absolute w-full mt-1 bg-white border border-slate-200 rounded shadow-md z-10 max-h-[200px] overflow-y-auto">
                {levels.map((level: string) => (
                    <div 
                        key={level}
                        className={`px-3 py-2 cursor-pointer hover:bg-slate-100 ${selectedLevels.includes(level) ? 'bg-slate-50' : ''}`}
                        onClick={() => toggleLevel(level)}
                    >
                        <div className="flex items-center">
                            <div className={`w-4 h-4 mr-2 flex items-center justify-center border rounded ${selectedLevels.includes(level) ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                                {selectedLevels.includes(level) && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            {capitaliseText(level)}
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default LevelFilterDropdown;