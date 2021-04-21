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
  
  const getSpotsForDay = function (dayObj, appointments) {

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  }

  const updateSpots = function (dayName, days, appointments) {

    // Find the day Object
    const dayObj = days.find(x => x.name === dayName);

    // calculate spots for this day
    const spots = getSpotsForDay(dayObj, appointments);

    const newDay = {
      ...dayObj,
      spots
    };

    const newDays = days.map(day => day.name === dayName ? newDay : day);

    return newDays;
  };

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(state.day, state.days, appointments);

        setState({ ...state, appointments, days })
      });
  }

  function bookInterview(id, interview) {

    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: {
            ...interview
          }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(state.day, state.days, appointments);

        setState({ ...state, appointments, days });
      })
  }

  return {state, setDay, cancelInterview, bookInterview}

}
