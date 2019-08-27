import React, { useState, useEffect } from "react";
import "./App.css";
import TimeZones from "./components/TimeZones";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "./theme";

function App() {
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [firstTimeZone, setFirstTimeZone] = useState([]);
  const [firstTimeZoneHours, setFirstTimeZoneHours] = useState("");
  const [firstTimeZoneMinutes, setFirstTimeZoneMinutes] = useState("");

  const [secondTimeZone, setSecondTimeZone] = useState([]);
  const [secondTimeZoneHours, setSecondTimeZoneHours] = useState("");
  const [secondTimeZoneMinutes, setSecondTimeZoneMinutes] = useState("");

  const [hourTest, setHourTest] = useState("");
  const [minuteTest, setMinuteTest] = useState("");

  useEffect(() => {
    fetch(
      "http://api.timezonedb.com/v2.1/list-time-zone?key=H4DLI5SD6Q65&format=json"
    )
      .then(res => res.json())
      .then(data => {
        setTimeZoneList(data.zones);
      })
      .catch(console.log);
  }, [setTimeZoneList]);

  useEffect(() => {
    const fetchedTime = firstTimeZone.formattedTime;
    if (fetchedTime) {
      const hours = fetchedTime.slice(0, 2);
      const minutes = fetchedTime.slice(3, 5);
      setFirstTimeZoneHours(hours);
      setFirstTimeZoneMinutes(minutes);
    } else {
      console.log("it's not");
    }
  }, [firstTimeZone, setFirstTimeZoneHours, setFirstTimeZoneMinutes]);

  useEffect(() => {
    const fetchedTime = secondTimeZone.formattedTime;
    if (fetchedTime) {
      const hours = fetchedTime.slice(0, 2);
      const minutes = fetchedTime.slice(3, 5);
      setSecondTimeZoneHours(hours);
      setSecondTimeZoneMinutes(minutes);
    } else {
      console.log("it's not");
    }
  }, [secondTimeZone, setSecondTimeZoneHours, setSecondTimeZoneMinutes]);

  timeZoneList.forEach(timeZone => {
    let zoneName = timeZone.zoneName;
    zoneName = zoneName.replace(/_/g, " ");
    const countryName = timeZone.countryName;
    const slash = zoneName.lastIndexOf("/");
    const cityOnly = zoneName.substring(slash + 1);
    timeZone.cityName = cityOnly + ", " + countryName;
  });

  function fetchTimeZone(requestedTimezone, numberSelection) {
    const myLink =
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

  function checkTime() {
    fetch(
      "http://api.timezonedb.com/v2.1/get-time-zone?key=H4DLI5SD6Q65&format=json&by=zone&zone=Asia/Taipei&time=1566898144"
    )
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
        console.log(timeZone);
      });
  }

  function dateConverter() {
    const timeInput = hourTest + ":" + minuteTest;
    const currentDate = new Date().toString().slice(0, 11);
    const year = new Date().getFullYear();
    const unixTimeStamp = Math.round(
      Date.parse(currentDate + timeInput + ":000 +0000 " + year) / 1000
    );

    fetch(
      "http://api.timezonedb.com/v2.1/get-time-zone?key=H4DLI5SD6Q65&format=json&by=zone&zone=Asia/Taipei&time=" +
        unixTimeStamp
    )
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
        console.log("timestamp", unixTimeStamp);
        console.log("timeZone", timeZone);
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

  console.log(firstTimeZoneMinutes);
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
        hours={firstTimeZoneHours}
        setHours={setFirstTimeZoneHours}
        minutes={firstTimeZoneMinutes}
        setMinutes={setFirstTimeZoneMinutes}
      />
      <br />
      <TimeZones
        selectedTimeZone={secondTimeZone}
        handleChange={handleSecondChange}
        handleSubmit={handleSubmit}
        timeZoneList={timeZoneList}
        hours={secondTimeZoneHours}
        setHours={setSecondTimeZoneHours}
        minutes={secondTimeZoneMinutes}
        setMinutes={setSecondTimeZoneMinutes}
      />
      <h2>other</h2>
      <label>
        Hours
        <input value={hourTest} onChange={e => setHourTest(e.target.value)} />
      </label>
      <label>
        Minutes
        <input
          value={minuteTest}
          onChange={e => setMinuteTest(e.target.value)}
        />
      </label>
      <br />
      <button onClick={dateConverter}>Hello</button>
      <button onClick={checkTime}>Check time</button>
    </div>
  );
}

export default App;
