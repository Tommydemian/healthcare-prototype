import { useCallback, useEffect, useRef, useState } from "react";
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
    annotation,
} from "@cornerstonejs/tools";

import type { IStackViewport } from "@cornerstonejs/core/types";
import { MouseBindings } from "@cornerstonejs/tools/enums";

type StackConfig = {
    imageId: string;
};

export const useStack = ({ imageId }: StackConfig) => {
    const [isLoading, setIsLoading] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);
    const toolGroupRef = useRef<ReturnType<typeof ToolGroupManager.createToolGroup> | null>(null);
    const viewportRef = useRef<IStackViewport | null>(null);

    useEffect(() => {
        const setStack = async () => {
            // purpouse of this ref usage is to avoid 2ble effect execution due to strict-mode
            if (hasInitialized.current) {
                return;
            }
            hasInitialized.current = true;

            // init libraries
            await csToolsInit();
            await coreInit();
            await dicomImageLoaderInit();

            const imageIds = ["wadouri:/sample-2.dcm"];

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

                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
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

    const setActiveTool = useCallback((toolName: string) => {
        if (!toolGroupRef.current) return;

        toolGroupRef.current.setToolPassive(LengthTool.toolName);
        toolGroupRef.current.setToolPassive(PanTool.toolName);

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

        const lengthAnnotations = annotation.state.getAnnotations(LengthTool.toolName, containerRef.current!);

        lengthAnnotations.forEach((ann) => {
            annotation.state.removeAnnotation(ann.annotationUID!);
        });

        const probeAnnotations = annotation.state.getAnnotations(ProbeTool.toolName, containerRef.current!);

        probeAnnotations.forEach((ann) => {
            annotation.state.removeAnnotation(ann.annotationUID!);
        });

        viewportRef.current.render();
    }, []);

    useEffect(() => {
        if (!hasInitialized.current || !viewportRef.current) return;

        setIsLoading(true);

        const imageMap: Record<string, string> = {
            "image-1": "wadouri:/sample-2.dcm",
            "image-2": "wadouri:/sample-55.dcm",
            "image-3": "wadouri:/sample-205.dcm",
        };

        const imageUrl = imageMap[imageId] || imageMap["image-1"];

        // Update the current viewport with the new image
        viewportRef.current.setStack([imageUrl], 0);
        viewportRef.current.render();
        setIsLoading(false);
    }, [imageId, viewportRef]);

    return {
        containerRef,
        setActiveTool,
        isLoading,
        viewportRef,
        resetAll,
    };
};
