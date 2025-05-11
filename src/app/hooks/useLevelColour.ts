import { useMemo } from "react";
import { LevelColor } from "../types/definitions";
import { getColorsByLevel } from "../helpers/helpers";

export const useLevelColour = (level: string): LevelColor => {
    return useMemo<LevelColor>(() => {
        return getColorsByLevel(level);
    }, [level]);
};