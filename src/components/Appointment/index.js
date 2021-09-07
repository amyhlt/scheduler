import React from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import { useEffect } from "react";
export default function Appointment(props) {
    //Lists all modes
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE ="CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    const ERROR_SAVE ="ERROR_SAVE";
    const ERROR_DELETE ="ERROR_DELETE";
    const { mode, transition, back } = useVisualMode(
        props.interview? SHOW : EMPTY
    );
    useEffect(() => {
        if (props.interview && mode === EMPTY) {
         transition(SHOW);
        }
        if (props.interview === null && mode === SHOW) {
         transition(EMPTY);
        }
    }, [props.interview, transition, mode]);
    function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer:interviewer.id
        }
     transition(SAVING);
     props.bookInterview(props.id, interview)
     .then(() => transition(SHOW))
     .catch(error => transition(ERROR_SAVE, true));
    }
    function cancel(id){
        if(mode === SHOW) {
          transition(CONFIRM);
        } else {
            transition(DELETING, true);
            props.cancelInterview(props.id)
             .then(() => transition(EMPTY))
             .catch(error => transition(ERROR_DELETE, true));
        }
    }
    function edit(){ 
        transition(EDIT);
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
                onEdit={edit}   
                />
            )}
            {mode === CREATE && (
             <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>
            )}
            {mode === SAVING && <Status message="Saving" />}
            {mode === CONFIRM  && <Confirm onConfirm={cancel} onCancel={props.onCancel} message="Are you sure you would like to delete?"/>}
            {mode === EDIT && <Form name={props.student} interviewers={props.interviewers} 
                               onSave={save} onCancel={back}/>}
        </article>
    );
}