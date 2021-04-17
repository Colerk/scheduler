import React from "react";

import "components/Application.scss";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from 'axios';



export default function Application(props) {

 function cancelInterview (id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.delete(`/api/appointments/${id}`)
  .then(()=>{
    setState({
      ...state,
      appointments
    });
  })
 }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview} )
    .then(()=>{
      setState({
        ...state,
        appointments
      });
    })
  }
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day)



  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/appointments'),
      axios.get('/api/days'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
        const [listAppointments, listDays, listInterviews] = all
        setState(prev => ({...prev, appointments: listAppointments.data, days: listDays.data, interviewers: listInterviews.data }));
    })
  }, [])  



  const list = dailyAppointments.map(x => {
    const interview = getInterview(state, x.interview);



    return <Appointment 
      key={x.id}
      {...x}
      interview={interview} 
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {list}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}