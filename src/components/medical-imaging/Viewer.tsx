// Components
import { ViewerHeader } from "./ViewerHeader";
import { ViewerCanvas } from "./ViewerCanvas";
import { ViewerControls } from "./ViewerControls";
import { ViewerFooter } from "./ViewerFooter";
// Hooks
import { useViewerTools } from "./hooks/useViewerTools";
import { useCornerStore } from "./hooks/useCornerStone";

export const Viewer: React.FC = () => {
    const { resetWindowLevel, zoomOut, viewportRef } = useViewerTools();
    const { elementRef } = useCornerStore({ viewportRef });

    return (
        <article className="overflow-clip rounded-lg bg-base shadow-md">
            <ViewerHeader />

            <div className="p-4">
                <ViewerCanvas elementRef={elementRef} />
                <ViewerControls resetWindowLevel={resetWindowLevel} zoomOut={zoomOut} />
                <ViewerFooter />
            </div>
        </article>
    );
};
