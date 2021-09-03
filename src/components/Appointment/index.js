import React from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Header";
import Show from "components/Appointment/Show";
export default function Appointment(props){
    
    return (
        <article className="appointment">
           <Header time={props.time} ></Header>
           {props.interview ?<Show  student={props.student} interviewer={props.interviewer}/>: <Empty />}
        </article>
    );
}