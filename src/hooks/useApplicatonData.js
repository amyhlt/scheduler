import axios from "axios";
import { useReducer, useEffect } from "react";
import reducer from "../reducer/reducer";
/**
 * 
 * data processed by using axios
 * geting data from api, inserting data to api and deleting data from api
 * including bookInterviews, cancelInterviews and getInterviews
 */
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
          if (appointment.type === "SET_INTERVIEW") {
          }
        };
      });
    }, []);
      
    function bookInterview(id, interview,mode) {
      
        return axios.put(`/api/appointments/${id}`, { interview }).then(res => { 
          
          if(mode === "CREATE") {
            dispatch({ type: "createInterview", id: id, interview: interview});
          }
          if(mode === "EDIT") {
            dispatch({ type: "updateInterview", id: id, interview: interview});
          }
       }); 
     }
     function cancelInterview(id){
        return axios.delete(`/api/appointments/${id}`).then(res => {
         dispatch({ type: "cancelInterview",id: id});
        });
      }
      
   return { state, setDay, bookInterview, cancelInterview };
   
}