import type { StackViewport } from "@cornerstonejs/core";
import { useState, useEffect } from "react";

type WindowLevelControlsConfig = {
    viewportRef: React.RefObject<StackViewport | null>;
};
export const useWindowLevelControls = ({ viewportRef }: WindowLevelControlsConfig) => {
    const [windowWidth, setWindowWidth] = useState(400);
    const [windowCenter, setWindowCenter] = useState(40);

    useEffect(() => {
        if (!viewportRef.current) return;

        const lower = windowCenter - windowWidth / 2;
        const upper = windowCenter + windowWidth / 2;

        viewportRef.current.setProperties({
            voiRange: {
                lower,
                upper,
            },
        });
        viewportRef.current.render();
    }, [windowWidth, windowCenter]);

    return {
        windowWidth,
        setWindowWidth,
        windowCenter,
        setWindowCenter,
    };
};
