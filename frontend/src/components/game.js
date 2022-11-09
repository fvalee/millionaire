import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import Question from "./question";
import MoneyLadder from "./moneyLadder";

function Game() {
    const location = useLocation()
    const navigate = useNavigate()

    const [currentGameId, setCurrentGameId] = useState("")
    const [ladder, setLadder] = useState([])

    useEffect(() => {
        setCurrentGameId(location.state.id)
        setLadder(location.state.ladder)
    }, [])

    function quitGame() {
        navigate("/")
    }

    return(
        <div className={"App-header"}>
            <Container>
                <Row className="centered">
                        <Col sm={9}><Question game={currentGameId} ladder={ladder} /></Col>
                        <Col sm={3}><MoneyLadder ladder={ladder} /></Col>
                </Row>
                <Row>
                    <Col>
                        <Button size={"sm"} onClick={() => {quitGame()}} variant={"outline-secondary"}>Exit</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Game;
