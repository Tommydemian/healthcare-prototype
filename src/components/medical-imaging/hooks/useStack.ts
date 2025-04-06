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
// type StackConfig = {

// };
export const useStack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const running = useRef(false);
    const toolGroupRef = useRef<ReturnType<typeof ToolGroupManager.createToolGroup> | null>(null);

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
            // ctToolGroup?.setToolActive(LengthTool.toolName, {
            //     bindings: [{ mouseButton: MouseBindings.Primary }],
            // });
            // ctToolGroup?.setToolActive(PanTool.toolName, {
            //     bindings: [{ mouseButton: MouseBindings.Auxiliary }],
            // });
            // ctToolGroup?.setToolActive(ZoomTool.toolName, {
            //     bindings: [{ mouseButton: MouseBindings.Secondary }],
            // });
            // ctToolGroup?.setToolActive(ProbeTool.toolName);
            // 9) Default tool: Let's say we make "Length" active by default
            ctToolGroup?.setToolActive(LengthTool.toolName, {
                bindings: [
                    {
                        mouseButton: MouseBindings.Primary, // left click
                    },
                ],
            });

            // we might set others to passive if we want
            ctToolGroup?.setToolPassive(ProbeTool.toolName);
            ctToolGroup?.setToolPassive(PanTool.toolName);
            ctToolGroup?.setToolPassive(ZoomTool.toolName);

            viewport.render();
        };

        setStack();
    }, []);

    // A function to switch the currently active tool
    const setActiveTool = useCallback((toolName: string) => {
        console.log("EXEC");
        console.log("EXEC");
        if (!toolGroupRef.current) return;
        console.log("EXEC222");

        // first set everything else to passive
        toolGroupRef.current.setToolPassive(LengthTool.toolName);
        toolGroupRef.current.setToolPassive(PanTool.toolName);
        toolGroupRef.current.setToolPassive(ZoomTool.toolName);
        toolGroupRef.current.setToolPassive(ProbeTool.toolName);

        // then set the requested tool to active (on left click)
        toolGroupRef.current.setToolActive(toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Primary,
                },
            ],
        });

        console.log("setActiveTool completed for:", toolName);
    }, []);

    return {
        containerRef,
        setActiveTool,
    };
};
