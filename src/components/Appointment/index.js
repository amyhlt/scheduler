import React from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
export default function Appointment(props) {
    //Lists all modes
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const { mode, transition, back } = useVisualMode(
        props.interviewer ? SHOW : EMPTY
    );
    
    return (
        <article className="appointment">
            <Header time={props.time} ></Header>
            {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
            {mode === SHOW && (
                <Show
                    student={props.student}
                    interviewer={props.interviewer}
                    interviewers={props.interviewers}
                />
            )}
        </article>
    );
}