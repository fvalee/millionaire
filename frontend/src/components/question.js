import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function Question(props) {
    const location = useLocation()
    const [question, setQuestion] = useState([])
    const [finished, setFinished] = useState(false)
    const [askNext, setAskNext] = useState(true)
    const [won, setWon] = useState(false)
    const [guaranteed, setGuaranteed] = useState("0")
    const [ladder, setLadder] = useState([])

    const [clickedA, setClickedA] = useState("")
    const [clickedB, setClickedB] = useState("")
    const [clickedC, setClickedC] = useState("")
    const [clickedD, setClickedD] = useState("")

    function askQuestion() {
        if (askNext) {
            fetch(`/api/game/${props.game}`)
                .then(response => response.json())
                .then(data => {
                    setQuestion(data)

                    localStorage.setItem('last-answered', data.questionNumber)
                    window.dispatchEvent(new Event('storage'))

                    if (data.questionNumber === 15) {
                        setAskNext(false)
                    }

                    setupGuaranteed(data.questionNumber)
                })
        }
    }

    function answerQuestion(key) {
        highlightOption(key, "clickedOption")

        setTimeout(() => {
            fetch(`/api/game/${props.game}/${key}`, {method: 'PUT'})
                .then(response => response.json())
                .then(data => {
                    if (data.givenAnswer !== data.correctAnswer) {
                        highlightOption(data.correctAnswer, "correctOption")
                        setTimeout(() => {
                            setFinished(true)
                        }, 2000)
                    } else {
                        highlightOption(key, "correctOption")
                        setTimeout(() => {
                            highlightOption(key, "")
                            askQuestion()
                        }, 2000)
                        if (question.questionNumber === 15) {
                            setWon(true)
                            setGuaranteed(ladder.find(e => e.id === 15).value)
                            localStorage.setItem('last-answered', "16")
                            window.dispatchEvent(new Event('storage'))
                            setTimeout(() => {
                                setFinished(true)
                            }, 2000)
                        }
                    }
                })
        }, 2000)
    }

    function highlightOption(key, style) {
        if (key === 'A') {
            setClickedA(style)
        } else if (key === 'B') {
            setClickedB(style)
        } else if (key === 'C') {
            setClickedC(style)
        } else {
            setClickedD(style)
        }
    }

    function setupGuaranteed(currentQuestion) {
        if (currentQuestion > 5 && currentQuestion < 10) {
            setGuaranteed(ladder.find(e => e.id === 5).value)
        } else if (currentQuestion > 10 && currentQuestion < 15) {
            setGuaranteed(ladder.find(e => e.id === 10).value)
        }
    }

    useEffect(() => {
        askQuestion()
        setLadder(location.state.ladder)
    }, [props])

    return(
        <>
            {finished ?
                <Container className={"mainQuestionContainer backShadow"}>
                    <Row className={"answersRow"}>
                        <Col className={"questionField centered"}>
                            <Container>
                                <Row><h5>Total winnings</h5></Row>
                                <Row><h1>{guaranteed}</h1></Row>
                            </Container>

                        </Col>
                    </Row>
                </Container>
                :
                <Container className={"mainQuestionContainer backShadow"}>
                    <Row className={"answersRow"}>
                        <Col className={"questionField centered"}>
                            <h4>{question["question"]}</h4>
                        </Col>
                    </Row>
                    <Row className={"answersRow"}>
                        <Container>
                            <Row className={"answers"}>
                                <Col className={"answerCol"}>
                                    <Button onClick={() => {answerQuestion('A')}} className={`optionButton ${clickedA}`}>
                                        <span className={"option"}>A:</span> {question["optionA"]}
                                    </Button>
                                </Col>
                                <Col className={"answerCol"}>
                                    <Button onClick={() => {answerQuestion('B')}} className={`optionButton ${clickedB}`}>
                                        <span className={"option"}>B:</span> {question["optionB"]}
                                    </Button>
                                </Col>
                            </Row>
                            <Row className={"answers"}>
                                <Col className={"answerCol"}>
                                    <Button onClick={() => {answerQuestion('C')}} className={`optionButton ${clickedC}`}>
                                        <span className={"option"}>C:</span> {question["optionC"]}
                                    </Button>
                                </Col>
                                <Col className={"answerCol"}>
                                    <Button onClick={() => {answerQuestion('D')}} className={`optionButton ${clickedD}`}>
                                        <span className={"option"}>D:</span> {question["optionD"]}
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            }
        </>
    );
}

export default Question;
