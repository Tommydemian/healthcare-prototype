import { useEffect, useRef } from "react";
import { init as csRenderInit, RenderingEngine, Enums } from "@cornerstonejs/core";
import {
    init as csToolsInit,
    Enums as csToolsEnums,
    addTool,
    ToolGroupManager,
    WindowLevelTool,
    ZoomTool,
} from "@cornerstonejs/tools";
import { init as dicomImageLoaderInit } from "@cornerstonejs/dicom-image-loader";
import type { IStackViewport } from "@cornerstonejs/core/types";

type CornerStoneConfig = {
    viewportRef: React.RefObject<IStackViewport | null>;
    imageId?: string;
};
export const useCornerStore = ({ viewportRef, imageId = "image-1" }: CornerStoneConfig) => {
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
                type: Enums.ViewportType.STACK,
            });

            if (elementRef.current) {
                elementRef.current.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                });
            }

            // For a single-slice approach:
            const stackViewport = renderingEngine.getViewport(viewportId) as IStackViewport;
            viewportRef.current = stackViewport;
            // const imageIds = ["wadouri:http://localhost:5173/sample-55.dcm"];
            const imageMap: Record<string, string> = {
                "image-1": "wadouri:http://localhost:5173/sample-2.dcm",
                "image-2": "wadouri:http://localhost:5173/sample-55.dcm",
                "image-3": "wadouri:http://localhost:5173/sample-56.dcm",
            };

            const imageIds = [imageMap[imageId] || imageMap["image-1"]];

            // Set the stack
            try {
                stackViewport.setStack(imageIds, 0);
                stackViewport.render();
            } catch (error) {
                console.error("Error loading DICOM:", error);
            }

            const toolGroupId = "myToolGroup";
            const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

            addTool(ZoomTool);
            addTool(WindowLevelTool);
            toolGroup?.addTool(ZoomTool.toolName);
            toolGroup?.addTool(WindowLevelTool.toolName);

            toolGroup?.addViewport(viewportId);

            toolGroup?.setToolActive(WindowLevelTool.toolName, {
                bindings: [
                    {
                        mouseButton: csToolsEnums.MouseBindings.Primary, // Left Click
                    },
                ],
            });

            toolGroup?.setToolActive(ZoomTool.toolName, {
                bindings: [
                    {
                        mouseButton: csToolsEnums.MouseBindings.Secondary, // Right Click
                    },
                ],
            });
            stackViewport.render();
        };

        setup();
    }, []);

    // Add a new effect to update the image when imageId changes
    useEffect(() => {
        if (!hasInitialized.current || !viewportRef.current) return;

        const imageMap: Record<string, string> = {
            "image-1": "wadouri:http://localhost:5173/sample-2.dcm",
            "image-2": "wadouri:http://localhost:5173/sample-55.dcm",
            "image-3": "wadouri:http://localhost:5173/sample-56.dcm",
        };

        const imageUrl = imageMap[imageId] || imageMap["image-1"];

        // Update the current viewport with the new image
        viewportRef.current.setStack([imageUrl], 0);
        viewportRef.current.render();
    }, [imageId, viewportRef]);

    return {
        elementRef,
    };
};
