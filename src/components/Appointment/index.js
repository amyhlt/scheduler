import React from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error"
import { useEffect } from "react";
/**
 * 
 * @param {*} props 
 * @returns different components based on mode
 * mode = Empty/SHOW/CREATE/SAVING/DELETING/CONFIRM/EDIT/ERROR
 */
export default function Appointment(props) {
    /* Lists all modes */
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

    /**
     * 
     * @param {*} name 
     * @param {*} interviewer 
     * click save button to book an interview
     */
    function save(name, interviewer,mode) {
    
      if(!interviewer){
          transition(ERROR_SAVE, true);
      } else {
          const interview = {
            student: name,
            interviewer:interviewer.id
          }
         transition(SAVING);
         props
         .bookInterview(props.id, interview,mode)
        .then(() => transition(SHOW))
        .catch((error) =>  {
          console.log("Saving error:", error);
        });
      }
        
    }
     
    
    /**
     * 
     * @param {*} id 
     * cancel an interview by interviewId
     */
    function cancel(id){
        if(mode === SHOW) {
          transition(CONFIRM);
        } else {
            transition(DELETING);
            props
            .cancelInterview(props.id)
            .then(() => transition(EMPTY),
                 error=>transition(ERROR_DELETE, true))
            .catch(error => transition(ERROR_DELETE, true));
        }
    }
    /**
     * click edit button to go to edit form
     */
    function edit(){ 
        transition(EDIT);
    }
    /**
     * close the window when ERROR_SAVE and ERROR_DELETE
     */
    function errorClose(){
        back();
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
               <Form interviewers={props.interviewers} mode="CREATE" onSave={save} onCancel={back}/>
            )}
            {mode === SAVING && <Status message="Saving" />}
            {mode === DELETING && <Status message="Deleting" />}
            {mode === CONFIRM  && <Confirm onConfirm={cancel} onCancel={back} message="Are you sure you would like to delete?"/>}
            {mode === EDIT && <Form name={props.student} interviewers={props.interviewers} interviewer={props.interview}
                            mode="EDIT"   onSave={save} onCancel={back}/>}
            {mode === ERROR_SAVE && (
                            <Error message="You must select an interviewer" onClose={errorClose} />
                             )}
            {mode === ERROR_DELETE && (
                           <Error message="Could not delete appointment" onClose={errorClose} />
             )}
        </article>
    );
}