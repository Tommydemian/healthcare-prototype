import { Viewer, ThumbnailStack, ViewerControls } from "./components/medical-imaging";
import { Container } from "./components/ui/Container";

import { useStack } from "./components/medical-imaging/hooks/useStack";
import { useActiveImageId } from "./components/medical-imaging/hooks/useActiveImageId";

import { availableImages } from "./data";

function App() {
    const { activeImageId, handleImageSelect } = useActiveImageId();
    const { containerRef, setActiveTool, viewportRef, resetAll } = useStack({ imageId: activeImageId });

    return (
        <main className="flex min-h-screen items-center">
            <Container>
                <article className="grid max-h-[50rem] grid-cols-[150px_2fr_2fr] gap-x-4 rounded-md border border-brder bg-[#f5f7fa] p-4 lg:grid-cols-[150px_3fr_1fr]">
                    <ThumbnailStack
                        thumbnails={availableImages}
                        onSelect={handleImageSelect}
                        activeId={activeImageId}
                    />
                    <Viewer containerRef={containerRef} />
                    <ViewerControls setActiveTool={setActiveTool} resetAll={resetAll} viewportRef={viewportRef} />
                </article>
            </Container>
        </main>
    );
}

export default App;
