import { Container } from "./components/ui/Container";
import { ImageViewer } from "./components/ImageViewer";
// import VolumeExample from "./components/VolumeExample";
function App() {
    return (
        <main className="my-4">
            <Container>
                <ImageViewer />
            </Container>
        </main>
    );
}

export default App;
