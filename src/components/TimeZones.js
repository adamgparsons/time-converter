import React, { useState, useEffect, fr } from "react";

function TimeZones({ timeZoneList }) {
  const [selectedTimeZone, setSelectedTimeZone] = useState("");

  function fetchTime(selectedTimeZone) {
    var myLink =
      "http://api.timezonedb.com/v2.1/get-time-zone?key=H4DLI5SD6Q65&format=json&by=zone&zone=" +
      selectedTimeZone;
    fetch(myLink)
      .then(res => res.json())
      .then(data => {
        const dateAndTime = data.formatted;
        const Time = dateAndTime.substring(dateAndTime.indexOf(" ") + 1);
        setSelectedTimeZone(Time);
      });
  }
  // useEffect(() => {
  //   var myLink =
  //     "http://api.timezonedb.com/v2.1/get-time-zone?key=H4DLI5SD6Q65&format=json&by=zone&zone=America/Chicago";
  //   fetch(myLink)
  //     .then(res => res.json())
  //     .then(data => {
  //       const TimeZoneDate = new Date(data.timestamp * 1000);
  //       const Time =
  //         TimeZoneDate.getHours() +
  //         ":" +
  //         TimeZoneDate.getMinutes() +
  //         ":" +
  //         TimeZoneDate.getSeconds();
  //       setTestTime(Time);
  //     })
  //     .catch(console.log);
  // }, [setTestTime]);

  function handleChange(e) {
    fetchTime(e.target.value);
  }
  return (
    <div>
      <select
        name="timezones"
        id="timezones"
        onChange={handleChange}
        value={selectedTimeZone.cityName}
      >
        <option></option>
        {timeZoneList.map((timeZone, i) => (
          <option value={timeZone.zoneName} key={i}>
            {timeZone.cityName}
          </option>
        ))}
      </select>
      <h2>{selectedTimeZone}</h2>
    </div>
  );
}

export default TimeZones;
