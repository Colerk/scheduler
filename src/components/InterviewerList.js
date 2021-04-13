import React from "react";
import "components/InterviewerList.scss";
import classNames from 'classnames';
import InterviewerListItem from "components/InterviewerListItem"


export default function InterviewerList(props) {

  const items = props.interviewers.map(x => {
    return <InterviewerListItem 
      key={x.id}
      name={x.name}
      avatar={x.avatar}
      selected={x.id === props.interviewer}
    />
  })


return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {items}
    </ul>
  </section>
  )
}