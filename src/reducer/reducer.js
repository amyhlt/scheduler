
 export default function reducer(state, action){
    switch (action.type) {
      case "setDay":
        return { ...state, day: action.value };
      case "setData":
        return {
              ...state,
              days: action.value.days,
              appointments: action.value.appointments,
              interviewers: action.value.interviewers
            };
      case "updateInterview":
        let thatDay = state.days.find(
          day => day.appointments.includes(action.id)
        );
  
        if(action.interview){
            thatDay.spots -= 1;
          const appointment = {
            ...state.appointments[action.id],
            interview: { ...action.interview }
          };
          const appointments = {
            ...state.appointments,
            [ action.id]: appointment
          };
          let newDays = [...state.days];
          newDays[thatDay.id -1] = thatDay;
          return { ...state, appointments: appointments, days: newDays };
        } else {
            thatDay.spots += 1;
            const appointment = {
            ...state.appointments[action.id],
            interview: null
             };
          
             const appointments = {
            ...state.appointments,
            [ action.id]: appointment
             };
  
          let newDays = [...state.days];
          newDays[thatDay.id -1] = thatDay;
          return { ...state, appointments: appointments, days: newDays };
        }
      default:
          return {...state};
    }      
 }