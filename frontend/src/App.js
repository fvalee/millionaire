import './css/App.css';
import Start from "./components/start";

function App() {
    const lastAnsweredQuestion = "0";
    localStorage.setItem('last-answered', lastAnsweredQuestion)

    return (
        <div className={"App-header"}>
            <div className="App Main-centered backShadow">
                <h2 className={"Spacer"}>Who Wants to be a <br/> Millionaire?</h2>
                <Start />
            </div>
        </div>
    );
}

export default App;
