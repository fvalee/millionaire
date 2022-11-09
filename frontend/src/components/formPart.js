import {Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import '../css/App.css';
import {Reorder} from "framer-motion";

function FormPart(props) {

    const [ordered, setOrdered] = useState([])

    useEffect(() => {
        setOrdered(props.questions)
    }, [props.questions])

    useEffect(() => {
        props.setValue(ordered.slice(0,5).map(el => el.questionId))
    }, [ordered])

    return(
        <>
            <Container>
                <h4>Choose questions from {props.category} category. </h4> <br />
                Drag and drop the questions to highlight five that will be asked in your new game. <br/>
                Order matters. Highest ordered question will be asked first. <br />
                {" "} <br />
                <Reorder.Group axis={"y"} values={props.questions} onReorder={setOrdered}>
                    {ordered.map(q => (
                        <Reorder.Item className={"optionRow"} key={q.questionId} value={q}>
                            <Container>
                                <Row>{q.question}</Row>
                            </Container>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </Container>
        </>
    );
}

export default FormPart
