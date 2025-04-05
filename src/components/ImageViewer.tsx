import { useEffect, useRef } from "react";
// Cornerstone imports
import { init as csRenderInit, RenderingEngine, Enums } from "@cornerstonejs/core";
import { init as csToolsInit } from "@cornerstonejs/tools";
import { init as dicomImageLoaderInit } from "@cornerstonejs/dicom-image-loader";
import type { IStackViewport } from "@cornerstonejs/core/types";

export const ImageViewer: React.FC = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        const setup = async () => {
            if (hasInitialized.current) return;
            hasInitialized.current = true;

            await csRenderInit();
            await csToolsInit();
            dicomImageLoaderInit({ maxWebWorkers: 1 });

            const renderingEngine = new RenderingEngine("myEngine");
            const viewportId = "STACK_VIEWPORT";

            renderingEngine.enableElement({
                viewportId,
                element: elementRef.current!,
                type: Enums.ViewportType.STACK, // <--- stack type
            });

            // For a single-slice approach:
            const stackViewport = renderingEngine.getViewport(viewportId) as IStackViewport;

            const imageIds = ["wadouri:http://localhost:5173/sample-2.dcm"];

            // Set the stack
            stackViewport.setStack(imageIds, 0);
            stackViewport.render();
        };

        setup();
    }, []);

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Volume Viewer (Cornerstone3D)</h2>
            <div>
                <div ref={elementRef} style={{ width: 512, height: 512 }} />
            </div>
            <p>Left-click = Zoom, Right-click = Pan</p>
        </div>
    );
};
