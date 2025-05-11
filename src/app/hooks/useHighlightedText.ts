import { useMemo } from "react";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const useHighlightedText = (text: string, searchTerm: string): string => {
    return useMemo(() => {
        if (!searchTerm) return text;

        const escaped = escapeRegExp(searchTerm);
        const parts = text.split(new RegExp(`(${escaped})`, "gi"));

        return parts.map(
            (part) => part.toLowerCase() === searchTerm.toLowerCase() ? `<strong>${part}</strong>` : part
        ).join("");
    }, [text, searchTerm]);
};