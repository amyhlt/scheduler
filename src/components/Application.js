import React from "react";

import "components/Application.scss";
import DayList from "./DayList"
import InterviewerList from "./InterviewerList";
import { useState } from "react";
import { useEffect } from "react";
import { getAppointmentsForDay, getInterview,getInterviewersForDay } from "helpers/selectors";
import Appointment from "components/Appointment/index";
import axios from "axios";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
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
            interviewer={interview.interviewer}
            student={interview.student}
            interviewers={interviewers}
          />
        );
      } else{
        return (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interviewer={null}
            interviewers={interviewers}
           
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
          <DayList days={state.days} day={state.day}  setDay={day=>day}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {schedule}

      </section>
    </main>
  );
}

