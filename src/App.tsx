import { useCallback, useState } from "react";
import { Container } from "./components/ui/Container";
import { Viewer } from "./components/medical-imaging";
import { ThumbnailStack } from "./components/medical-imaging/ThumbnailStack";
import { availableImages } from "./data";
import { useViewerTools } from "./components/medical-imaging/hooks/useViewerTools";
import { ViewerControls } from "./components/medical-imaging/ViewerControls";

function App() {
    const [activeImageId, setActiveImageId] = useState("image-1");
    const { resetWindowLevel, zoomOut, viewportRef } = useViewerTools();

    const handleSelect = useCallback((id: string) => {
        setActiveImageId(id);
    }, []);

    return (
        <main className="my-4">
            <Container className="grid grid-cols-1 gap-x-4 md:grid-cols-[1fr_3fr_1fr]">
                <ThumbnailStack thumbnails={availableImages} onSelect={handleSelect} activeId={activeImageId} />
                <Viewer activeImageId={activeImageId} viewportRef={viewportRef} />
                <ViewerControls resetWindowLevel={resetWindowLevel} zoomOut={zoomOut} />
            </Container>
        </main>
    );
}

export default App;
