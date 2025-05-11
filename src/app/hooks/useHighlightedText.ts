import { useMemo } from "react";

const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const useHighlightedText = (text: string, searchTerm: string): string => {
    return useMemo<string>(() => {
        if (!searchTerm) return text;

        const escaped: string = escapeRegExp(searchTerm);
        const parts: string[] = text.split(new RegExp(`(${escaped})`, "gi"));

        return parts.map(
            (part: string): string => 
                part.toLowerCase() === searchTerm.toLowerCase() 
                    ? `<strong>${part}</strong>` 
                    : part
        ).join("");
    }, [text, searchTerm]);
};