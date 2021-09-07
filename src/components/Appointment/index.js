import React from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
export default function Appointment(props) {
    //Lists all modes
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE ="CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING"
    const CONFIRM = "CONFIRM"
    const { mode, transition, back } = useVisualMode(
        props.interview? SHOW : EMPTY
    );
    function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer:interviewer.id
        }
     transition("SAVING");
     props.bookInterview(props.id,interview)
     .then(()=>
           transition("SHOW")) ;
    
    }
    function cancel(id){
        transition("CONFIRM");
        transition("DELETING") ;
        props.cancelInterview(props.id)
        .then(()=>
        transition("SHOW")) ;

    }
    return (
        <article className="appointment">
            <Header time={props.time} ></Header>
            {mode === EMPTY &&  <Empty  onAdd={transition}/>}
            {mode === SHOW && props.interview && (
                <Show
                student={props.student}
                interviewer={props.interview}
                onDelete={cancel}
                onEdit={props.onEdit}
                    
                />
            )}
            {mode === CREATE && (
             <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>
             
            )}
            {mode === SAVING && <Status message="Saving" />}
            {mode === CONFIRM  && <Confirm onConfirm={cancel} onCancel={props.onCancel} message="Are you sure you would like to delete?"/>}
        </article>
    );
}