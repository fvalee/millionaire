import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function Administrator() {
    const navigate = useNavigate()

    function goToQuestionEditor() {
        navigate("/administrator/edit/questions")
    }

    function goToGameEditor() {
        navigate("/administrator/edit/game")
    }

    return(
        <div className={"App-header"}>
            <div className="App Main-centered backShadow">
                <Container>
                    <h2 className={"spacer"}>Administrator panel</h2>
                    <Button onClick={() => {goToQuestionEditor()}}>Question Editor</Button> {" "}
                    <Button onClick={() => {goToGameEditor()}}>Game Editor</Button>
                </Container>
            </div>
        </div>
    );
}

export default Administrator;