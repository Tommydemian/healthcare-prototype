import type React from "react";
import { useEffect, useRef } from "react";

// Imports Cornerstone
import { init as csRenderInit } from "@cornerstonejs/core";
import { init as csToolsInit } from "@cornerstonejs/tools";
import { init as dicomImageLoaderInit } from "@cornerstonejs/dicom-image-loader";

export const ImageViewer: React.FC = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    const running = useRef(false);

    useEffect(() => {
        const setup = async () => {
            if (running.current) return;
            running.current = true;

            await csRenderInit();
            await csToolsInit();
            dicomImageLoaderInit({ maxWebWorkers: 1 });
        };

        const element = elementRef.current;
        if (!element) return;
    }, []);

    return (
        <div>
            <h2>Visor de Imagen Médica</h2>
            <div
                ref={elementRef}
                style={{
                    width: "512px",
                    height: "512px",
                    border: "1px solid black",
                    margin: "0 auto",
                }}
            />
            <p>
                Usa botón izquierdo para <strong>Zoom</strong> y botón derecho para <strong>Pan</strong>.
            </p>
        </div>
    );
};
