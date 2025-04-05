import { Container } from "./components/ui/Container";
import { ImageViewer } from "./components/ImageViewer";
// import VolumeExample from "./components/VolumeExample";
function App() {
    localStorage.setItem("debug", "cornerstone*,dicomImageLoader");

    return (
        <main className="my-4">
            <Container>
                <h1 className="text-red-100 text-xl">healthcare-prototype</h1>
                <ImageViewer />
                {/* <VolumeExample /> */}
            </Container>
        </main>
    );
}

export default App;
