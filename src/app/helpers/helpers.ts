import { LevelColor } from "../types/definitions";
import colorData from "@/app/data/colors.json";

export const dateInUtc = (date: Date): string => {
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
    const yyyy = date.getUTCFullYear();
    const HH = String(date.getUTCHours()).padStart(2, "0");
    const mm = String(date.getUTCMinutes()).padStart(2, "0");
    const ss = String(date.getUTCSeconds()).padStart(2, "0");
    return `${dd}-${MM}-${yyyy} ${HH}:${mm}:${ss}`;
};

export const capitaliseText = (value: string): string => {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1).toLowerCase()
};

export const getColorsByLevel = (level: string): LevelColor => {
    const lookup = (colorData as Record<string, LevelColor>)[level.toLowerCase()];
    return lookup ?? colorData.default;
};