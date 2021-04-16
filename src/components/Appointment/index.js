import React from 'react';
import "./styles.scss"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from "components/Appointment/Form";




export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    
  );

  return (<> 
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interview={props.interview.interviewer}
    />)}
    {mode === CREATE && <Form name="cole" 
    interviewers={props.interviewers} 
    onCancel={() => back()}
    />}

    </>);
}