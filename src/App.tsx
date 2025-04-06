import { Container } from "./components/ui/Container";
import { Viewer } from "./components/medical-imaging/Viewer";
function App() {
    return (
        <main className="my-4">
            <Container>
                <Viewer />
            </Container>
        </main>
    );
}

export default App;
