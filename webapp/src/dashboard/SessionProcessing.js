let getMinutes = function(start, end) { return Math.floor(((Math.abs(start  - end)) / 1000) / 60); } // hours

export function ProcessSessionData(data) {
  // create our session object, this will hold all the data that is used in the dashboards.
  // each i index of each value represents the ith object.
  // ex. topics[1] and locations[1] belong to the same session
  let sessions = {
    topics: [],
    locations: [],
    times: []
  };

  // loop through each session and start aggregating their information
  data.forEach((session) => {
    sessions.topics.push(session.topic.toUpperCase());
    sessions.locations.push(session.location.toUpperCase());
    sessions.times.push({
      date: (session.start_time.split('T')[0]).split(' ')[0],
      difference: getMinutes(new Date(session.start_time), new Date(session.end_time))
    });
  })
  console.log("s", sessions)
  return sessions;
}

export function GroupSameDayDifferences(data) {
  let sessions = {};
  // create a frequency count of the dates and their times.
  // if we have an existing date, just add the additional study session time
  data.forEach((session) => {
    sessions[session.date] = (sessions[session.date] || 0) + session.difference
  })
  // we are then reformatting the above
  let days = [];
  for(const property in sessions) {
    days.push({date: property, difference: sessions[property]})
  }
  console.log(days)
  return days;
}