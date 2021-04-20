import React from 'react';
import "./styles.scss"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Delete from "components/Appointment/Delete";
import Error from "components/Appointment/Error";






export default function Appointment(props) {



  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = 'ERROR_DELETE';


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(() =>{
      transition(SHOW)
    })
    .catch((error) => {
      transition(ERROR_SAVE, true)
    })
  }

  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(EDIT)
    props.bookInterview(props.id, interview)
  }

  function cancel() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch(() => {
      transition(ERROR_DELETE, true)
    })
  }

  function confirmDelete() {
    transition(CONFIRM)
  }
 

  return (<article data-testid="appointment"> 
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interview={props.interview.interviewer}
    onDelete={confirmDelete}
    onEdit={edit}
    
    />)}
    {mode === CREATE && <Form name="" 
    interviewers={props.interviewers} 
    onCancel={cancel}
    onSave={save}
    
    />}
    {mode === SAVING && <Status message="Saving"/>}
    {mode === DELETING && <Status message="Deleting"/>}
    {mode === CONFIRM && <Delete 
      message="Are you sure you want to delete?"
      onCancel={back}
      onConfirm={cancel}
      />}
    {mode === EDIT && <Form 
      name={props.name} 
      interviewers={props.interviewers} 
      onCancel={back}
      onSave={save}
    />}
    {mode === ERROR_SAVE && <Error 
      message="Could not save?"
      onClick={back}
      />}
      {mode === ERROR_DELETE && <Error 
      message="Could not save?"
      onClick={back}
      />}
    </article>);
}