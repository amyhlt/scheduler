const state = {
    days: [
      {
        id: 1,
        name: "Monday",
        appointments: [1, 2, 3]
      },
      {
        id: 2,
        name: "Tuesday",
        appointments: [4, 5]
      }
    ],
    appointments: {
      "1": { id: 1, time: "12pm", interview: null },
      "2": { id: 2, time: "1pm", interview: null },
      "3": {
        id: 3,
        time: "2pm",
        interview: { student: "Archie Cohen", interviewer: 2 }
      },
      "4": { id: 4, time: "3pm", interview: null },
      "5": {
        id: 5,
        time: "4pm",
        interview: { student: "Chad Takahashi", interviewer: 2 }
      }
    },
    interviewers: {
      "1": {  
        "id": 1,
        "name": "Sylvia Palmer",
        "avatar": "https://i.imgur.com/LpaY82x.png"
      },
      "2": {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  };
export function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
   
   // const findDay = state.days.filter(d => d.name === day)[0];
   let findDay ="";
   for(const d of state.days){
       if(d.name===day){
         findDay = d;
         break;
       }
   }
    if(findDay){
        const appointmentsArr=findDay.appointments.map((appointment)=> state.appointments[appointment])
        return  appointmentsArr;
    } else {
        return [];
    }   
  }
export function getInterview(state, interview){
    let interviewerObj={};
    if(interview){
        for(const interviewer of Object.values(state.interviewers)){
            if(interviewer.id===interview.interviewer) {
                interviewerObj["student"] = interview.student;
                interviewerObj["interviewer"] = interviewer;
            }
        }
        return interviewerObj;
    } else {
        return null;
    }
    
  }
   
   