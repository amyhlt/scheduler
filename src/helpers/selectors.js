
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
 
   export function getInterviewersForDay(state, day) {
       const interviewerArr=[];
       const result = state.days.filter((d)=>d.name===day)[0]["interviewers"];
       if (result.length > 1) {
         for (const id of result){
            interviewerArr.push(state.interviewers[id]);
         }
        }
        return interviewerArr;
   }