import React from "react";
import 'components/Appointment/styles.scss';
export default function Show(props){
   const allInterviewers = props.interviewers.map(obj => {
    return (<img src={obj.avatar} alt=""></img>)
   });
    return (
        <main className="appointment__card appointment__card--show">
        <section className="appointment__card-left">
          <h2 className="text--regular">{props.student}</h2>
          <section className="interviewer">
            <h4 className="text--light">Interviewer</h4>
            <h3 className="text--regular">{props.interviewer.name}</h3>
            <img src={props.interviewer.avatar} alt=""></img>
            <div>
            {allInterviewers}
            </div>
            
              
          </section>
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <img
              className="appointment__actions-button"
              src="images/edit.png"
              alt="Edit"
              onEdit={props.onEdit}
            />
            <img
              className="appointment__actions-button"
              src="images/trash.png"
              alt="Delete"
              onDelete={props.onDelete}
            />
          </section>
        </section>
      </main>
    );
}