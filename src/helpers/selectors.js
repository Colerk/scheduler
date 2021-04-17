

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


function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  const { id, name, avatar } = state.interviewers[interview.interviewer];
  
  return {
    student: interview.student,
    interviewer: { id: id, name: name, avatar: avatar }
  }
}

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

// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }

// {
//   "id":1,
//   "time":"12pm",
//   "interview": {
//     "student": "Lydia Miller-Jones",
//     "interviewer": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     }
//   }
// }
