import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from 'react';
import { renderHook } from '@testing-library/react-hooks';



export default function Form(props) {

  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName('')
    setInterviewer(null)
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const save = () => {
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name='name'
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {setName(event.target.value)}}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} 
          setInterviewer={setInterviewer} />      
        </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} onSubmit={event => event.preventDefault()} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}
