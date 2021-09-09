import React from "react";
import "components/Application.scss";
import DayList from "./DayList"
import { getAppointmentsForDay, getInterview,getInterviewersForDay } from "helpers/selectors";
import Appointment from "components/Appointment/index";
import useApplicationData from "hooks/useApplicatonData";
/**
 * 
 * @returns homepage with sidebar(daylist) and main section(appointment lists)
 */
export default function Application() {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
 
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
            interviewers={interviewers}
            cancelInterview={cancelInterview}
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
            day={state.day}
            setDay={day => {
              setDay(day);
            }}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule"> {schedule}
      <Appointment className="appointment:last-of-type__add" id="last" time="" /></section>
    </main>
  );
}

