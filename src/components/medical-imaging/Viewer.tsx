import { useState } from "react";
// Components
import { ViewerHeader } from "./ViewerHeader";
import { ViewerCanvas } from "./ViewerCanvas";
import { ViewerControls } from "./ViewerControls";
import { ViewerFooter } from "./ViewerFooter";
// Hooks
import { useViewerTools } from "./hooks/useViewerTools";
import { useCornerStore } from "./hooks/useCornerStone";
import { ThumbnailStack } from "./ThumbnailStack";
// Data
import { availableImages } from "../../data";

export const Viewer: React.FC = () => {
    const [activeImageId, setActiveImageId] = useState("image-1");
    const { resetWindowLevel, zoomOut, viewportRef } = useViewerTools();
    const { elementRef } = useCornerStore({ viewportRef, imageId: activeImageId });

    return (
        <article className="overflow-clip rounded-lg bg-base shadow-md">
            <ViewerHeader />

            <div className="p-4">
                <ViewerCanvas elementRef={elementRef} />
                <ViewerControls resetWindowLevel={resetWindowLevel} zoomOut={zoomOut} />

                <ThumbnailStack thumbnails={availableImages} onSelect={setActiveImageId} activeId={activeImageId} />

                <ViewerFooter />
            </div>
        </article>
    );
};
