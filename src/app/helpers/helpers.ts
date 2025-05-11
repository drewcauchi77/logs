import { LevelColor } from "../types/definitions";
import colorData from "@/app/data/colors.json";

/**
 * Formats a date in UTC format as DD-MM-YYYY HH:MM:SS
 */
export const dateInUtc = (date: Date): string => {
    const dd: string = String(date.getUTCDate()).padStart(2, "0");
    const MM: string = String(date.getUTCMonth() + 1).padStart(2, "0");
    const yyyy: number = date.getUTCFullYear();
    const HH: string = String(date.getUTCHours()).padStart(2, "0");
    const mm: string = String(date.getUTCMinutes()).padStart(2, "0");
    const ss: string = String(date.getUTCSeconds()).padStart(2, "0");
    return `${dd}-${MM}-${yyyy} ${HH}:${mm}:${ss}`;
};

/**
 * Capitalizes the first letter of a string and lowercases the rest
 */
export const capitaliseText = (value: string): string => {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1).toLowerCase();
};

/**
 * Gets color classes for a specific log level
 */
export const getColorsByLevel = (level: string): LevelColor => {
    const lookup: LevelColor | undefined = (colorData as Record<string, LevelColor>)[level.toLowerCase()];
    return lookup ?? colorData.default;
};