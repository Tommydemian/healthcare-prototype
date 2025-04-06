import { useCallback, useState } from "react";
import { Container } from "./components/ui/Container";
import { Viewer } from "./components/medical-imaging";
import { ThumbnailStack } from "./components/medical-imaging/ThumbnailStack";
import { availableImages } from "./data";
function App() {
    const [activeImageId, setActiveImageId] = useState("image-1");

    const handleSelect = useCallback((id: string) => {
        setActiveImageId(id);
    }, []);

    return (
        <main className="my-4">
            <Container className="grid grid-cols-1 gap-x-4 md:grid-cols-[1fr_4fr]">
                <ThumbnailStack thumbnails={availableImages} onSelect={handleSelect} activeId={activeImageId} />
                <Viewer activeImageId={activeImageId} />
            </Container>
        </main>
    );
}

export default App;
