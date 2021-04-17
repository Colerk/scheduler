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
  
  const newSpotDay = (dayName, daysArr, add) => {
    for (let day of daysArr) {
      if (day.name === dayName) {
        let newSpots = day.spots;
        add ? newSpots += 1 : newSpots -= 1
        return { ...day, spots: newSpots }
      }
    }
  }

  const newDaysArr = (dayObj, daysArr) => {
    return daysArr.map(day => day.name === dayObj.name ? dayObj : day);
  }


  function cancelInterview (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = newDaysArr(newSpotDay(state.day, state.days, true), state.days)
  
    return axios.delete(`/api/appointments/${id}`)
    .then(()=>{
      setState({
        ...state,
        appointments,
        days
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

    const days = newDaysArr(newSpotDay(state.day, state.days, null), state.days)

    return axios.put(`/api/appointments/${id}`, {interview} )
    .then(()=>{
      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  return {state, setDay, cancelInterview, bookInterview}

}
