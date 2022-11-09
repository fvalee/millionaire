import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom";

function MoneyLadder() {
    const location = useLocation()

    const [ladder, setLadder] = useState(location.state.ladder)
    const [lastAnsweredQuestion, setLastAnsweredQuestion] = useState("0")

    useEffect(() => {
        window.addEventListener('storage',
            (e) => setLastAnsweredQuestion(localStorage.getItem('last-answered')))
        setLadder(location.state.ladder)
    }, [ladder])

    useEffect(() => {
        if (lastAnsweredQuestion !== undefined) {
            try {
                const currentWon = document.getElementById(`moneyLadderQ${lastAnsweredQuestion - 1}`)
                currentWon.className += " currentWinnings"
                const lastWon = document.getElementById(`moneyLadderQ${lastAnsweredQuestion - 2}`)
                lastWon.className = lastWon.className.replace("currentWinnings", "")
            } catch (e) {}
        }
    }, [lastAnsweredQuestion])

    return(
        <Container>
            {ladder.map(e => (
                <Row key={e.id + "elem"} className={`moneyLadderElement`} id={`moneyLadderQ${e.id}`}>
                    <Col sm={2} className={"alignRight"}>{e.id}</Col>
                    <Col sm={10}>{e.value}</Col>
                </Row>
            ))}
        </Container>
    );
}

export default MoneyLadder;