import React from "react";
import DayListItem from "components/DayListItem";



export default function DayList(props) {

  const items = props.days.map(x => {
    
    return <DayListItem 
      key={x.id}
      name={x.name} 
      spots={x.spots} 
      selected={x.name === props.day}
      setDay={props.setDay}/>
  })

  return (
    <ul>
      {items}
    </ul>
  );
}