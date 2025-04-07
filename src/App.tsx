import { Viewer, ThumbnailStack, ViewerControls } from "./components/medical-imaging";
import { Container } from "./components/ui/Container";

import { useStack } from "./components/medical-imaging/hooks/useStack";
import { useActiveImageId } from "./components/medical-imaging/hooks/useActiveImageId";

import { availableImages } from "./data";

function App() {
    const { activeImageId, handleImageSelect } = useActiveImageId();
    const { containerRef, setActiveTool, viewportRef, resetAll, isLoading } = useStack({ imageId: activeImageId });

    return (
        <main className="flex min-h-screen lg:items-center">
            <Container>
                <article className="mt-2 grid grid-cols-1 gap-x-4 rounded-md md:grid-cols-[1fr_1fr] md:border md:border-brder md:bg-[#f5f7fa] md:p-2 lg:mt-0 lg:max-h-[50rem] lg:grid-cols-[150px_3fr_1fr]">
                    <ThumbnailStack
                        thumbnails={availableImages}
                        onSelect={handleImageSelect}
                        activeId={activeImageId}
                    />
                    <Viewer isLoading={isLoading} containerRef={containerRef} />
                    <ViewerControls setActiveTool={setActiveTool} resetAll={resetAll} viewportRef={viewportRef} />
                </article>
            </Container>
        </main>
    );
}

export default App;
