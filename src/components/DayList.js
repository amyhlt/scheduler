import React from "react";
import DayListItem from "./DayListItem";
/**
 * 
 * @param {*} props 
 * @returns list of day with day name and the remaining of spots
 */
export default function DayList(props){
    
    const listItems =props.days.map(day=>(
         <DayListItem 
         key={day.name}
         name={day.name} 
         spots={day.spots} 
         selected={day.name === props.day}
         setDay={props.setDay} /> 
         
     )) ;
  return (
      <ul>
      {listItems}
      </ul>
  );
}
