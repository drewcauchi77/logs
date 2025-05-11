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
            <div className="flex w-full border-b border-slate-200">
                <div className="p-4 w-[15%]">
                    <p className="block text-sm text-slate-800">{dateTime}</p>
                </div>
                <div className="p-4 w-[15%]">
                    <p className="block text-sm text-slate-800">
                        <span className={`w-2 h-2 ${levelColour.backgroundColor} inline-block mr-2 rounded-full border-1 border-solid ${levelColour.borderColor}`}></span>
                        <strong>{capitaliseText(level)}</strong>
                    </p>
                </div>
                <div className="p-4 w-[40%]">
                    <p 
                        className="block text-sm text-slate-800" 
                        dangerouslySetInnerHTML={{ __html: highlightedMsg }}
                    />
                </div>
                <div className="p-4 w-[30%]">
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