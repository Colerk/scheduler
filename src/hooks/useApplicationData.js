import axios from 'axios';
import React, { useState, useEffect } from "react";
import DayListItem from "components/DayListItem";



export default function useApplicationData() { 

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/appointments'),
      axios.get('/api/days'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
        
        const [listAppointments, listDays, listInterviews] = all
        setState(prev => ({...prev, appointments: listAppointments.data, 
                              days: listDays.data, interviewers: listInterviews.data }));

    })
  }, [])
  
  if (state.days[0]) {
    console.log('statedays', state.days[0].spots)
  }

  // console.log('stateappointments', state.appointments)
  // console.log('state', state)


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

  return {state, setDay, cancelInterview, bookInterview}


}

// days.id.spots