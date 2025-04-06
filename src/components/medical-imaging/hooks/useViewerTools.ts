import { useRef } from "react";
import type { IStackViewport } from "@cornerstonejs/core/types";

export const useViewerTools = () => {
    const viewportRef = useRef<IStackViewport | null>(null);

    const zoomOut = () => {
        if (!viewportRef.current) return;
        viewportRef.current.resetCamera();
        viewportRef.current.render();
    };

    const resetWindowLevel = () => {
        if (!viewportRef.current) return;
        viewportRef.current.resetToDefaultProperties();
        viewportRef.current.render();
    };

    return {
        zoomOut,
        resetWindowLevel,
        viewportRef,
    };
};
