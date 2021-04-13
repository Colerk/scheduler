import React from "react";
import "components/InterviewerListItem.scss";
import "components/InterviewerList.scss";

import classNames from 'classnames';


export default function InterviewerListItem(props) {

  const interviewersClass = classNames("li", {
    "interviewers__item--selected": props.selected,
    "interviewers__item": true,
  })

  // if (props.selected) {
    return (
      <li className={interviewersClass} onClick={props.setInterviewer}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.selected && props.name}
      </li>
    )
}