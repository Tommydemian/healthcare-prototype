import { useEffect, useRef } from "react";
import { init as csRenderInit, RenderingEngine, Enums, volumeLoader, type VolumeViewport } from "@cornerstonejs/core";
import { init as csToolsInit } from "@cornerstonejs/tools";
import { init as dicomImageLoaderInit } from "@cornerstonejs/dicom-image-loader";

export default function VolumeExample() {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const setup = async () => {
            await csRenderInit();
            await csToolsInit();
            dicomImageLoaderInit({ maxWebWorkers: 1 });

            const renderingEngine = new RenderingEngine("myEngine");
            const viewportId = "VOLUME_VIEWPORT";

            renderingEngine.enableElement({
                viewportId,
                element: elementRef.current!,
                type: Enums.ViewportType.ORTHOGRAPHIC, // or VOLUME
            });

            // A "VolumeViewport" instead of a stack
            const volumeViewport = renderingEngine.getViewport(viewportId) as VolumeViewport;

            const imageIds = [
                "wadouri:http://localhost:5173/sample-2.dcm",
                // or multiple slices
            ];

            // Create and cache the volume
            const volumeId = "cornerstoneStreamingImageVolume:myVolume";
            const volume = await volumeLoader.createAndCacheVolume(volumeId, { imageIds });
            await volume.load();

            // Attach volume to the viewport
            volumeViewport.setVolumes([{ volumeId }]);
            volumeViewport.render();
        };

        setup();
    }, []);

    return <div ref={elementRef} style={{ width: 512, height: 512, border: "1px solid green" }} />;
}
