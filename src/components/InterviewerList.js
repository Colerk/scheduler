import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from 'prop-types';


export default function InterviewerList(props) {

  const items = props.interviewers.map(x => {
    return <InterviewerListItem 
      key={x.id}
      name={x.name}
      avatar={x.avatar}
      selected={x.id === props.value}
      setInterviewer={event => props.setInterviewer(x.id)}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};