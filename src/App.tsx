import { useCallback, useState } from "react";
import { Container } from "./components/ui/Container";

import { useStack } from "./components/medical-imaging/hooks/useStack";
import { availableImages } from "./data";
import { ThumbnailStack } from "./components/medical-imaging/ThumbnailStack";
import { Viewer } from "./components/medical-imaging";
import { ViewerControls } from "./components/medical-imaging/ViewerControls";
import { useWindowLevelControls } from "./components/medical-imaging/hooks/useWindowLevelControls";

function App() {
    const [activeImageId, setActiveImageId] = useState("image-1");
    const { containerRef, setActiveTool, viewportRef, resetAll } = useStack({ imageId: activeImageId });

    const { setWindowCenter, setWindowWidth, windowCenter, windowWidth } = useWindowLevelControls({ viewportRef });

    const handleSelect = useCallback((id: string) => {
        setActiveImageId(id);
    }, []);

    return (
        <main className="my-4">
            <Container>
                <div className="grid max-h-[50rem] grid-cols-[150px_3fr_1fr] gap-x-4 rounded-md border border-brder bg-white p-4">
                    <ThumbnailStack thumbnails={availableImages} onSelect={handleSelect} activeId={activeImageId} />
                    <Viewer containerRef={containerRef} />
                    <ViewerControls
                        setActiveTool={setActiveTool}
                        windowWidth={windowWidth}
                        setWindowWidth={setWindowWidth}
                        windowCenter={windowCenter}
                        setWindowCenter={setWindowCenter}
                        resetAll={resetAll}
                    />
                </div>
            </Container>
        </main>
    );
}

export default App;
