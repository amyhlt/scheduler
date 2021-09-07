import React from "react";

import "components/Application.scss";
import DayList from "./DayList"

import { useState } from "react";
import { useEffect } from "react";
import { getAppointmentsForDay, getInterview,getInterviewersForDay } from "helpers/selectors";
import Appointment from "components/Appointment/index";
import axios from "axios";



export default function Application() {
  const [state, setState] = useState({
    day: "Friday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);
  function bookInterview(id, interview) {
     const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    
     return axios.put(`/api/appointments/${id}`, { interview }).then(res => {
    }); 
  }
  function cancelInterview(id){
    console.log("delete id=",id);
    return axios.delete(`/api/appointments/${id}`).then(res => {
    });
    
  }
   
  function onEdit(){}
  const appointments = getAppointmentsForDay(state, state.day);
  
  const schedule = appointments.map((appointment) => {
        
    const interview = getInterview(state, appointment.interview);
    let interviewers = getInterviewersForDay(state, state.day)
   
      if(interview){
        return (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            
            interview={interview.interviewer}
            student={interview.student}
           
            cancelInterview={cancelInterview}
            onEdit={onEdit}
            bookInterview={bookInterview}
          />
        
        );
      } else{
        
        return (
          
          <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={null}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          />
        );
      }
   
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            propDay={state.day}
            setDay={state.day}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule"> {schedule}</section>
    </main>
  );
}

