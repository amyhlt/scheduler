import React from 'react';
import 'components/InterviewerListItem.scss';
export default function InterviewerListItem(props){
  return (
    <li className="interviewers__item" onClick={props.setInterviewer}>
    <img className="interviewers__item-image"  src={props.avatar} alt={props.name}></img>
    <h2>   {props.selected && props.name}</h2>
    </li>
     
  );
}
