import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import '../css/App.css';
import {useNavigate} from "react-router-dom";
import FormPart from "./formPart";

function GameEditor() {
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [easy, setEasy] = useState([])
    const [medium, setMedium] = useState([])
    const [hard, setHard] = useState([])

    const [chosenEasy, setChosenEasy] = useState([])
    const [chosenMedium, setChosenMedium] = useState([])
    const [chosenHard, setChosenHard] = useState([])

    const [gameId, setGameId] = useState("")

    useEffect(() => {
        fetch(`/api/question/level/easy/all`)
            .then(response => response.json())
            .then(data => {setEasy(data)})
        fetch(`/api/question/level/medium/all`)
            .then(response => response.json())
            .then(data => {setMedium(data)})
        fetch(`/api/question/level/hard/all`)
            .then(response => response.json())
            .then(data => {setHard(data)})
    }, [])

    function submit() {
        setStep(4)
        let questionSet = chosenEasy.concat(chosenMedium, chosenHard)

        fetch(`/api/game/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questions: questionSet
            })
        })
            .then(response => response.json())
            .then(data => {
                setGameId(data.gameId)
            })
    }

    function exit() {
        navigate("/")
    }

    return(
        <div className={"App-header"}>
            {
                {
                    1:<FormPart questions={easy} category={"easy"} setValue={setChosenEasy} />,
                    2:<FormPart questions={medium} category={"medium"} setValue={setChosenMedium} />,
                    3:<FormPart questions={hard} category={"hard"} setValue={setChosenHard} />,
                    4:<>Your Game ID is: {gameId}<br/> Copy it and then paste it in the text box on the main screen to start your game.</>
                }[step]
            }
            <br />
            <div style={{display:"inline", margin:"10px"}}>
                {step === 3 || step === 4 ? "" : <Button size={"sm"} onClick={() => {setStep(step + 1)}}>Next</Button>} {" "}
                {step === 3 ? <Button size={"sm"} onClick={() => {submit()}}>Create</Button> : ""} {" "}
                <Button size={"sm"} variant={"outline-secondary"} onClick={() => {exit()}}>Exit</Button>
            </div>
        </div>
    );
}

export default GameEditor
