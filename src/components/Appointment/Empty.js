import React from "react";
import 'components/Appointment/styles.scss';
/**
 * show an empty appointment if this time hasn't been booked. 
 * Users can click the ADD button to book an appointment
**/
export default function Empty(props){
  const CREATE = "CREATE";
  
    return (
        <main className="appointment__add">
        <img
          className="appointment__add-button"
          src="images/add.png"
          alt="Add"
          onClick={()=>props.onAdd(CREATE)}
        />
      </main>
    );
}