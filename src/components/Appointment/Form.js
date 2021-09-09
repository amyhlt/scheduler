import React, { useState } from "react";
import 'components/Appointment/styles.scss';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

/**
 * 
 * @param {*} props 
 * @returns a new appointment with student name,interviewer name and avator.
 * Fill out the form for creating a new appointment
 */
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [mode,setMode] = useState(props.mode || null);
  const [error, setError] = useState("");
 
  function reset() {
    setName("");
    setInterviewer(null);
  }
  function cancel() {
    reset();
    props.onCancel();
  }
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer,mode);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
            mode={mode}
          />
        </form>
        <label className="appointment__validation">{error}</label>
        {interviewer ? <InterviewerList
          interviewers={props.interviewers}
          value={interviewer.id}
          name={interviewer.name}
          onChange={setInterviewer}
        />
          :
          <InterviewerList
            interviewers={props.interviewers}
            value={props.interviewers.id}
            onChange={setInterviewer}
          />
        }
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={event => validate()}> Save </Button>
        </section>
      </section>
    </main>
  );
}