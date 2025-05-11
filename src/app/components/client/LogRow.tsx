"use client";

import React from "react";
import { LogRowProps, LevelColor, LogEntry } from "@/app/types/definitions";
import { useHighlightedText } from "@/app/hooks/useHighlightedText";
import { capitaliseText } from "@/app/helpers/helpers";
import { useLevelColour } from "@/app/hooks/useLevelColour";

const LogRow: React.FC<LogRowProps> = ({ log, searchTerm = '' }: LogRowProps) => {
    const { dateTime, level, msg, source }: LogEntry = log;

    const levelColour: LevelColor = useLevelColour(level);
    const highlightedMsg: string = useHighlightedText(msg, searchTerm);
    const highlightedSource: string = useHighlightedText(source, searchTerm);

    return (
        <div className="hover:bg-slate-50">
            <div className="flex flex-col md:flex-row w-full border-b border-slate-200">
                <div className="flex md:hidden w-full">
                    <div className="p-3 w-1/2">
                        <p className="block text-sm text-slate-800">{dateTime}</p>
                    </div>
                    <div className="p-3 w-1/2">
                        <p className="block text-sm text-slate-800">
                            <span className={`w-2 h-2 ${levelColour.backgroundColor} inline-block mr-2 rounded-full border-1 border-solid ${levelColour.borderColor}`}></span>
                            <strong>{capitaliseText(level)}</strong>
                        </p>
                    </div>
                </div>
                
                <div className="hidden md:block p-4 w-[20%] lg:w-[15%]">
                    <p className="block text-sm text-slate-800">{dateTime}</p>
                </div>
                <div className="hidden md:block p-4 w-[15%] lg:w-[15%]">
                    <p className="block text-sm text-slate-800">
                        <span className={`w-2 h-2 ${levelColour.backgroundColor} inline-block mr-2 rounded-full border-1 border-solid ${levelColour.borderColor}`}></span>
                        <strong>{capitaliseText(level)}</strong>
                    </p>
                </div>
                
                <div className="p-3 md:p-4 w-full md:w-[35%] lg:w-[40%]">
                    <p 
                        className="block text-sm text-slate-800" 
                        dangerouslySetInnerHTML={{ __html: highlightedMsg }}
                    />
                </div>
                
                <div className="p-3 md:p-4 w-full md:w-[30%]">
                    <p 
                        className="block text-sm text-slate-800" 
                        dangerouslySetInnerHTML={{ __html: highlightedSource }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LogRow;