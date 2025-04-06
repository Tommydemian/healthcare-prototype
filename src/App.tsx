// import { useCallback, useState } from "react";
// import { useViewerTools } from "./components/medical-imaging/hooks/useViewerTools";

import { useStack } from "./components/medical-imaging/hooks/useStack";
import { ToolPanel } from "./components/medical-imaging/ToolPanel";

function App() {
    // const [activeImageId, setActiveImageId] = useState("image-1");
    // const { resetWindowLevel, zoomOut, viewportRef } = useViewerTools();

    const { containerRef, setActiveTool } = useStack();

    // const handleSelect = useCallback((id: string) => {
    //     setActiveImageId(id);
    // }, []);

    return (
        <main className="my-4">
            <div className="cols-2 grid">
                <ToolPanel onSelectTool={setActiveTool} />
                <div ref={containerRef} className="h-[500px] w-[500px]" />
            </div>
            {/* <Container className="grid grid-cols-1 gap-x-4 md:grid-cols-[1fr_3fr_1fr]">
                <ThumbnailStack thumbnails={availableImages} onSelect={handleSelect} activeId={activeImageId} />
                <Viewer activeImageId={activeImageId} viewportRef={viewportRef} />
                <ViewerControls resetWindowLevel={resetWindowLevel} zoomOut={zoomOut} />
            </Container> */}
        </main>
    );
}

export default App;
