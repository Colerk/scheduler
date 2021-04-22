
// Finds the appointments for each day. Used in Application.js

function getAppointmentsForDay(state, day) {

  const found = state.days.find(dayApp => dayApp.name === day);

  if (!found) {
    return [];
  }

  const newArr = found.appointments.map(y => {
    if (state.appointments[y]) {
      return state.appointments[y]
    }
  });
  
  return newArr;
}

// Used to populate the interviews with the correct data
function getInterview(state, interview) {
  
  if (!interview || !interview.interviewer) {
    return null;
  }

  const { id, name, avatar } = state.interviewers[interview.interviewer];
  
  return {
    student: interview.student,
    interviewer: { id: id, name: name, avatar: avatar }
  }
}

// Finds the interviewers available for each day. Used in Application.js
function getInterviewersForDay(state, day) {

  const found = state.days.find(dayApp => dayApp.name === day);

  if (!found) {
    return [];
  }

  const newArr = found.interviewers.map(y => {
    if (state.interviewers[y]) {
      return state.interviewers[y]
    }
  });
  
  return newArr;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }

