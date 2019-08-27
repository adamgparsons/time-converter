import React, { useState, useEffect } from "react";
import "./App.css";
import TimeZones from "./components/TimeZones";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "./theme";

function App() {
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [firstTimeZone, setFirstTimeZone] = useState([]);
  const [secondTimeZone, setSecondTimeZone] = useState([]);

  useEffect(() => {
    fetch(
      "http://api.timezonedb.com/v2.1/list-time-zone?key=H4DLI5SD6Q65&format=json"
    )
      .then(res => res.json())
      .then(data => {
        setTimeZoneList(data.zones);
      })
      .catch(console.log);
  }, []);

  timeZoneList.forEach(timeZone => {
    let zoneName = timeZone.zoneName;
    zoneName = zoneName.replace(/_/g, " ");
    const countryName = timeZone.countryName;
    const slash = zoneName.lastIndexOf("/");
    const cityOnly = zoneName.substring(slash + 1);
    timeZone.cityName = cityOnly + ", " + countryName;
  });

  function fetchTimeZone(requestedTimezone, numberSelection) {
    var myLink =
      "http://api.timezonedb.com/v2.1/get-time-zone?key=H4DLI5SD6Q65&format=json&by=zone&zone=" +
      requestedTimezone;
    fetch(myLink)
      .then(res => res.json())
      .then(timeZone => {
        //formatt the date and time to just time
        const dateAndTime = timeZone.formatted;
        timeZone.formattedTime = dateAndTime.substring(
          dateAndTime.indexOf(" ") + 1
        );
        // formatt the location
        let zoneName = timeZone.zoneName;
        zoneName = zoneName.replace(/_/g, " ");
        const countryName = timeZone.countryName;
        const slash = zoneName.lastIndexOf("/");
        const cityOnly = zoneName.substring(slash + 1);
        timeZone.cityName = cityOnly + ", " + countryName;
        if (numberSelection === "firstSelection") {
          setFirstTimeZone(timeZone);
        }
        if (numberSelection === "secondSelection") setSecondTimeZone(timeZone);
      });
  }

  function handleFirstChange(e) {
    e.preventDefault();
    fetchTimeZone(e.target.value, "firstSelection");
  }

  function handleSecondChange(e) {
    e.preventDefault();
    fetchTimeZone(e.target.value, "secondSelection");
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  console.log(firstTimeZone);
  return (
    <div
      className="App"
      css={css`
        padding: ${theme.spacing[6]};
      `}
    >
      <TimeZones
        selectedTimeZone={firstTimeZone}
        handleChange={handleFirstChange}
        handleSubmit={handleSubmit}
        timeZoneList={timeZoneList}
      />
      <br />
      <TimeZones
        selectedTimeZone={secondTimeZone}
        handleChange={handleSecondChange}
        handleSubmit={handleSubmit}
        timeZoneList={timeZoneList}
      />
    </div>
  );
}

export default App;
