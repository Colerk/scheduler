

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

const getInterview = (state, interview) => {
  let result = {}
  if (!interview) {
    return null;
  }
  if (state.interviewers[interview.interviewer]) {
    result = {
      student: [interview.student].toString(),
      interviewer: state.interviewers[interview.interviewer]
    }
  return result;
  }
}


module.exports = { getAppointmentsForDay, getInterview }

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
