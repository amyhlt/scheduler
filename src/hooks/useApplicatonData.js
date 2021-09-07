import axios from "axios";
import { useReducer, useEffect } from "react";
import reducer from "../reducer/reducer";
export default function useApplicatonData(){
    const [state, dispatch] = useReducer(reducer, {
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
      });
      const setDay = day => dispatch({ type: "setDay", value: day });
      useEffect(() => {
        Promise.all([
          axios.get("http://localhost:8001/api/days"),
          axios.get("http://localhost:8001/api/appointments"),
          axios.get("http://localhost:8001/api/interviewers")
        ]).then((all) => {
            const days=all[0].data;
            const appointments=all[1].data;
            const interviewers= all[2].data ;
            dispatch({
                type: "setData",
                value: { days, appointments, interviewers }
              });
       
        const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
        socket.onopen = () => {
          console.log("Web socket opened");
          socket.send("Ping...");
        };
        socket.onmessage = appointmentData => {
          const appointment = JSON.parse(appointmentData.data);
          console.log(appointment);
  
          if (appointment.type === "SET_INTERVIEW") {
            dispatch({ type: "updateInterview", id: appointment.id, interview: appointment.interview});
          }
        };
      });
    }, []);
      
    function bookInterview(id, interview) {
        return axios.put(`/api/appointments/${id}`, { interview }).then(res => { 
       }); 
     }
     function cancelInterview(id){
        return axios.delete(`/api/appointments/${id}`).then(res => {
        });
      }
      
   return { state, setDay, bookInterview, cancelInterview };
   
}