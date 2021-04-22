import React from "react";
import 'components/DayListItem.scss';
import classNames from 'classnames';

// provides content for each individual day, where DayList maps over them
export default function DayListItem(props) {

  function formatSpots(props) {
    if (props === 0) {
    return `no spots remaining`
    } else if (props === 1) {
      return `${props} spot remaining`
    }
    else return `${props} spots remaining`
  }
  
  const dayClass = classNames("li", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots===0),
    "day-list__item": true
  })

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
