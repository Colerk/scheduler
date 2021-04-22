import React from "react";
import DayListItem from "components/DayListItem";

// Maps over and displays a list of days provided by, DayListItem

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