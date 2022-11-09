import {Button, InputGroup, Form} from "react-bootstrap";
import '../css/App.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Start(props) {
    const [gameId, setGameId] = useState("")
    const [thisGameId, setThisGameId] = useState("")
    const [ladder, setLadder] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/money-ladder')
            .then(response => response.json())
            .then(data => setLadder(data))
    }, [])

    useEffect(() => {
        if (thisGameId.length === 36) {
            navigate(`${thisGameId}`, {state:{id:`${thisGameId}`, ladder:ladder}})
        }
    }, [thisGameId])

    function createGame() {
        fetch('/api/game', {method: 'POST'})
            .then(response => response.json())
            .then(data => setThisGameId(data.id))
    }

    function continueGame() {
        fetch(`/api/game/${gameId}/check`)
            .then(response => response.json())
            .then(data => {
                if (data['exists'] === true) {
                    setThisGameId(gameId)
                }
                else {
                    console.log("Unknown game ID or game has finished.")
                }
            })
    }

    return(
        <>
            <Button variant={"primary"} className={"Spacer"} onClick={() => {createGame()}}>Start a new game</Button>
            <br />
            <p>or continue existing game</p>
            <InputGroup className="mb-3">
                <Form.Control placeholder="Game ID" onChange={(e) => setGameId(e.target.value)}/>
                <Button type={"submit"} onClick={() => {continueGame()}}>Enter</Button>
            </InputGroup>
            <Button size={"sm"} variant={"outline-secondary"} onClick={() => {navigate("/administrator")}}>Administrator panel</Button>
        </>
    );
}

export default Start;
