import { useEffect, useRef } from "react";
// Cornerstone imports
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

export const ImageViewer: React.FC = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);
    const viewportRef = useRef<IStackViewport | null>(null); // Referencia al viewport

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

            const imageIds = ["wadouri:http://localhost:5173/sample-2.dcm"];

            // Set the stack
            stackViewport.setStack(imageIds, 0);
            stackViewport.render();

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

    // Funciones para los botones
    const resetView = () => {
        if (!viewportRef.current) return;
        viewportRef.current.resetCamera();
        viewportRef.current.render();
    };

    const fitToWindow = () => {
        if (!viewportRef.current) return;
        viewportRef.current.resetToDefaultProperties();
        viewportRef.current.render();
    };

    return (
        <div style={{ padding: "1rem" }}>
            {/* <h2>Volume Viewer (Cornerstone3D)</h2>
            <div>
                <div ref={elementRef} style={{ width: 512, height: 512 }} />
            </div>
            <div className="mt-3 flex gap-2">
                <button
                    type="button"
                    onClick={resetView}
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                >
                    Reset View
                </button>
                <button
                    type="button"
                    onClick={fitToWindow}
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                >
                    Fit to Window
                </button>
            </div>
            <p>Left-click = Levels, Right-click = Zoom</p> */}
            <div className="overflow-hidden rounded-lg bg-[#F7FAFC] shadow-md">
                <div className="flex items-center justify-between bg-[#1A365D] p-3 text-white">
                    <h2 className="font-semibold text-lg">Advanced Medical Imaging Viewer</h2>
                    <div className="text-sm">Patient ID: ANONYMOUS-2023</div>
                </div>

                <div className="p-4">
                    <div className="relative overflow-hidden rounded-md border border-[#E2E8F0] bg-black">
                        <div ref={elementRef} className="h-[512px] w-full" />

                        {/* Overlay para metadatos */}
                        <div className="absolute bottom-2 left-2 rounded bg-black bg-opacity-60 p-1 text-white text-xs">
                            CT Scan • Axial View • 3mm Slice
                        </div>
                    </div>

                    {/* Panel de herramientas */}
                    <div className="mt-4 rounded-md border border-[#E2E8F0] bg-white p-3 shadow-sm">
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={resetView}
                                className="flex items-center rounded bg-[#2A4365] px-4 py-2 text-white transition-colors hover:bg-[#1A365D]"
                            >
                                <svg
                                    title="svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-1 h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0114 0V4a1 1 0 112 0v2.101a9.001 9.001 0 00-18 0V3a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                    <path d="M3 9.574a9 9 0 0118 0v5.851a3 3 0 01-3 3H6a3 3 0 01-3-3V9.574z" />
                                </svg>
                                Reset View
                            </button>

                            {/* <button
                                onClick={toggleMeasurement}
                                className={`flex items-center rounded px-4 py-2 transition-colors ${
                                    measurementActive
                                        ? "bg-[#38A169] text-white hover:bg-[#2F855A]"
                                        : "bg-[#4299E1] text-white hover:bg-[#3182CE]"
                                }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-1 h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M12 4.5a1.5 1.5 0 00-3 0v7.5a1.5 1.5 0 003 0V4.5z" />
                                    <path d="M3.75 2.5a.75.75 0 00-.75.75v14c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75v-14a.75.75 0 00-.75-.75H3.75z" />
                                </svg>
                                {measurementActive ? "Disable" : "Enable"} Measurement
                            </button> */}

                            <div className="ml-auto flex items-center text-[#4A5568] text-sm">
                                <div className="mr-4 flex items-center">
                                    <span className="mr-1 h-3 w-3 rounded-full bg-[#4299E1]" />
                                    {/* Left-click: {measurementActive ? "Measure" : "Adjust Contrast"} */}
                                </div>
                                <div className="mr-4 flex items-center">
                                    <span className="mr-1 h-3 w-3 rounded-full bg-[#E53E3E]" />
                                    Right-click: Pan
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-1 h-3 w-3 rounded-full bg-[#38A169]" />
                                    Scroll: Zoom
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-3 text-[#4A5568] text-xs">
                        <p>Image loaded from DICOM source. Advanced visualization tools enabled.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
