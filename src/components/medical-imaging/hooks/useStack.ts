import { useCallback, useEffect, useRef } from "react";
import { init as coreInit, RenderingEngine, Enums } from "@cornerstonejs/core";
import { init as dicomImageLoaderInit } from "@cornerstonejs/dicom-image-loader";
import {
    init as csToolsInit,
    ToolGroupManager,
    PanTool,
    ZoomTool,
    ProbeTool,
    LengthTool,
    addTool,
} from "@cornerstonejs/tools";

import type { IStackViewport } from "@cornerstonejs/core/types";
import { MouseBindings } from "@cornerstonejs/tools/enums";

type StackConfig = {
    imageId: string;
};

export const useStack = ({ imageId }: StackConfig) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const running = useRef(false);
    const toolGroupRef = useRef<ReturnType<typeof ToolGroupManager.createToolGroup> | null>(null);
    const viewportRef = useRef<IStackViewport | null>(null);

    useEffect(() => {
        const setStack = async () => {
            // purpouse of this ref usage is to avoid 2ble effect execution due to strict-mode
            if (running.current) {
                return;
            }
            running.current = true;

            // init libraries
            await csToolsInit();
            await coreInit();
            await dicomImageLoaderInit();

            const imageIds = ["wadouri:http://localhost:5173/sample-205.dcm"];

            // Rendering Engine
            const renderingEngineId = "myRenderingEngine";
            const renderingEngine = new RenderingEngine(renderingEngineId);

            // avoid right-click mouse to display context menu over the canvas
            if (containerRef.current) {
                containerRef.current.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                });
            }

            // Viewport
            const viewportId = "CT_AXIAL_STACK";

            if (containerRef.current != null) {
                const viewportInput = {
                    viewportId,
                    element: containerRef.current,
                    type: Enums.ViewportType.STACK,
                };

                // viewport creeation inside the rendering engine
                renderingEngine.enableElement(viewportInput);
            }

            const viewport = renderingEngine.getViewport(viewportId) as IStackViewport;
            viewportRef.current = viewport;

            try {
                viewport.setStack(imageIds, 0);
                viewport.render();
            } catch (error) {
                console.error(error);
            }

            const toolGroupId = "ctToolGroup";
            const ctToolGroup = ToolGroupManager.createToolGroup(toolGroupId);
            toolGroupRef.current = ctToolGroup;

            // Add tools to ToolGroup
            // Manipulation tools
            addTool(PanTool);
            addTool(ZoomTool);
            addTool(ProbeTool);
            addTool(LengthTool);
            ctToolGroup?.addTool(PanTool.toolName);
            ctToolGroup?.addTool(ZoomTool.toolName);
            ctToolGroup?.addTool(ProbeTool.toolName);
            ctToolGroup?.addTool(LengthTool.toolName);

            ctToolGroup?.addViewport(viewportId, renderingEngineId);

            // Set the ToolGroup's ToolMode for each tool
            // Possible modes include: 'Active', 'Passive', 'Enabled', 'Disabled'
            ctToolGroup?.setToolActive(LengthTool.toolName, {
                bindings: [{ mouseButton: MouseBindings.Primary }],
            });
            ctToolGroup?.setToolActive(PanTool.toolName, {
                bindings: [{ mouseButton: MouseBindings.Auxiliary }],
            });
            ctToolGroup?.setToolActive(ZoomTool.toolName, {
                bindings: [{ mouseButton: MouseBindings.Secondary }],
            });

            viewport.render();
        };

        setStack();
    }, []);

    // A function to switch the currently active tool
    const setActiveTool = useCallback((toolName: string) => {
        if (!toolGroupRef.current) return;

        // first set everything else to passive
        toolGroupRef.current.setToolPassive(LengthTool.toolName);
        toolGroupRef.current.setToolPassive(PanTool.toolName);

        // then set the requested tool to active (on left click)
        toolGroupRef.current.setToolActive(toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Primary,
                },
            ],
        });
    }, []);

    const resetAll = useCallback(() => {
        if (!viewportRef.current) return;

        // 1) Reset the camera (undo pan/zoom)
        viewportRef.current.resetCamera();

        // 2) Reset Window/Level to default
        viewportRef.current.resetToDefaultProperties();

        // 3) If you have measurements, optionally remove them from the ToolGroup
        // For example:
        // toolGroupRef.current?.toolState?.clear(...);
        // or some Cornerstone Tools API to clear measurements. Depends on the version/approach.

        // Re-render
        viewportRef.current.render();
    }, []);

    useEffect(() => {
        if (!running.current || !viewportRef.current) return;

        const imageMap: Record<string, string> = {
            "image-1": "wadouri:http://localhost:5173/sample-2.dcm",
            "image-2": "wadouri:http://localhost:5173/sample-55.dcm",
            "image-3": "wadouri:http://localhost:5173/sample-205.dcm",
        };

        const imageUrl = imageMap[imageId] || imageMap["image-1"];

        // Update the current viewport with the new image
        viewportRef.current.setStack([imageUrl], 0);
        viewportRef.current.render();
    }, [imageId, viewportRef]);

    return {
        containerRef,
        setActiveTool,
        viewportRef,
        resetAll,
    };
};
