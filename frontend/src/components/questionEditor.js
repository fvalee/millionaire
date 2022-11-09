import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import '../css/App.css';
import {useNavigate} from "react-router-dom";

function QuestionEditor() {
    const navigate = useNavigate()

    const [clickedA, setClickedA] = useState("")
    const [clickedB, setClickedB] = useState("")
    const [clickedC, setClickedC] = useState("")
    const [clickedD, setClickedD] = useState("")

    const [formQuestion, setFormQuestion] = useState("")
    const [formOptionA, setFormOptionA] = useState("")
    const [formOptionB, setFormOptionB] = useState("")
    const [formOptionC, setFormOptionC] = useState("")
    const [formOptionD, setFormOptionD] = useState("")
    const [correct, setCorrect] = useState("")
    const [difficulty, setDifficulty] = useState("")

    const [error, setError] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        highlightOption(correct, "correctOption")
    }, [correct])

    function highlightOption(key, style) {
        setClickedA("")
        setClickedB("")
        setClickedC("")
        setClickedD("")
        if (key === 'A') {
            setClickedA(style)
        } else if (key === 'B') {
            setClickedB(style)
        } else if (key === 'C') {
            setClickedC(style)
        } else if (key === 'D') {
            setClickedD(style)
        }
    }

    const addQuestion = e => {
        e.preventDefault()
        if (formQuestion === "" || formOptionA === "" || formOptionB === ""
            || formOptionC === "" || formOptionD === "" || correct === "" || difficulty === "") {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        } else {
            fetch(`/api/question`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: formQuestion,
                    optionA: formOptionA,
                    optionB: formOptionB,
                    optionC: formOptionC,
                    optionD: formOptionD,
                    correctAnswer: correct,
                    questionLevel: difficulty
                })
            })
                .then(response => response.json())
                .then(res => {
                    if (res === true) {
                        clearForm()
                        setSaved(true)
                        setTimeout(() => {
                            setSaved(false)
                        }, 3000)
                    }
                })
        }
    }

    function clearForm() {
        setFormQuestion("")
        setFormOptionA("")
        setFormOptionB("")
        setFormOptionC("")
        setFormOptionD("")
        setCorrect("")
        setDifficulty("")
        document.querySelectorAll('.radioCheckbox > input').forEach(e => {e.checked = false})
    }

    function exit() {
        navigate("/")
    }

    return(
        <div className={"App-header"}>
            <Container className={"mainQuestionContainer backShadow"}>
                <Row className={"answersRow"}>
                    <Col className={"questionField centered"}>
                        <h4>{formQuestion}</h4>
                    </Col>
                </Row>
                <Row className={"answersRow"}>
                    <Container>
                        <Row className={"answers"}>
                            <Col className={"answerCol"}>
                                <Button disabled className={`optionButton ${clickedA}`}>
                                    <span className={"option"}>A:</span> {formOptionA}
                                </Button>
                            </Col>
                            <Col className={"answerCol"}>
                                <Button disabled className={`optionButton ${clickedB}`}>
                                    <span className={"option"}>B:</span> {formOptionB}
                                </Button>
                            </Col>
                        </Row>
                        <Row className={"answers"}>
                            <Col className={"answerCol"}>
                                <Button disabled className={`optionButton ${clickedC}`}>
                                    <span className={"option"}>C:</span> {formOptionC}
                                </Button>
                            </Col>
                            <Col className={"answerCol"}>
                                <Button disabled className={`optionButton ${clickedD}`}>
                                    <span className={"option"}>D:</span> {formOptionD}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>

            <br />

            <Container>
                <Form onSubmit={addQuestion}>
                    <Row className={"answersRow"}>
                        <Col className={"answerCol"}>
                            <Form.Control placeholder={"Question Text"} value={formQuestion} onChange={(e) => setFormQuestion(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className={"answersRow"}>
                        <Col className={"answerCol"}>
                            <Form.Control placeholder={"Option A"} value={formOptionA} onChange={(e) => setFormOptionA(e.target.value)}></Form.Control>
                        </Col>
                        <Col className={"answerCol"}>
                            <Form.Control placeholder={"Option B"} value={formOptionB} onChange={(e) => setFormOptionB(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className={"answersRow"}>
                        <Col className={"answerCol"}>
                            <Form.Control placeholder={"Option C"} value={formOptionC} onChange={(e) => setFormOptionC(e.target.value)}></Form.Control>
                        </Col>
                        <Col className={"answerCol"}>
                            <Form.Control placeholder={"Option D"} value={formOptionD} onChange={(e) => setFormOptionD(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <strong>Select the correct answer</strong> <br />
                            {["A", "B", "C", "D"].map((ans) => (
                                <Form.Check inline name="correctAnswer" type={"radio"} value={`${ans}`}
                                            label={`${ans}`} id={`correct${ans}`} key={`${ans}`} className={"radioCheckbox"}
                                            onChange={(e) => setCorrect(e.target.value)}/>
                            ))}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <strong>Select the difficulty level</strong><br />
                            {["Easy", "Medium", "Hard"].map((diff) => (
                                <Form.Check inline name="difficulty" type={"radio"} value={`${diff}`}
                                            label={`${diff}`} key={`${diff}`} className={"radioCheckbox"}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                />
                            ))}
                            <br />
                            <strong>Note:</strong> Easy level questions will be chosen for the first five questions in each game.
                            Questions 6 through 10 will have medium difficulty whereas the last five questions will consist of hard questions.
                        </Col>
                    </Row>
                    <br />
                    <Button size={"sm"} type={"submit"}>Save</Button> {" "}
                    <Button size={"sm"} onClick={() => {clearForm()}} variant={"outline-warning"}>Clear</Button> {" "}
                    <Button size={"sm"} onClick={() => {exit()}} variant={"outline-secondary"}>Exit</Button>
                    {error ?
                        <p style={{"color":"red"}}>
                            Fill out the question field, all four alternatives, select the correct answer and question difficulty before saving.
                        </p> : ""
                    }
                    {saved ? <p style={{"color":"green"}}>Question saved successfully.</p> : ""}
                </Form>
            </Container>
        </div>
    );
}

export default QuestionEditor
