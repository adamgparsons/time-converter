import React, { useState, useEffect } from "react";
import "./App.css";
import TimeZones from "./components/TimeZones";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "./theme";

function App() {
  const [timeZoneList, setTimeZoneList] = useState([]);

  const [firstTimeZone, setFirstTimeZone] = useState([]);

  const [firstTzHourInput, setFirstTzHourInput] = useState("");
  const [firstTzHourQuery, setFirstTzHourQuery] = useState(
    new Date().getHours()
  );
  const [firstTzMinuteInput, setFirstTzMinuteInput] = useState("");
  const [firstTzMinuteQuery, setFirstTzMinuteQuery] = useState(
    new Date().getMinutes()
  );

  const [secondTimeZone, setSecondTimeZone] = useState([]);
  const [secondTzHourInput, setSecondTzHourInput] = useState("");
  const [secondTzHourQuery, setSecondTzHourQuery] = useState(
    new Date().getHours()
  );
  const [secondTzMinuteInput, setSecondTzMinuteInput] = useState("");
  const [secondTzMinuteQuery, setSecondTzMinuteQuery] = useState(
    new Date().getMinutes()
  );

  const [hourTest, setHourTest] = useState("");
  const [minuteTest, setMinuteTest] = useState("");

  console.log();
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

  // When time is fetched display the time in the tz1 input
  useEffect(() => {
    const fetchedTime = firstTimeZone.formattedTime;
    if (fetchedTime) {
      const hours = fetchedTime.slice(0, 2);
      const minutes = fetchedTime.slice(3, 5);
      setFirstTzHourInput(hours);
      setFirstTzMinuteInput(minutes);
    } else {
      console.log("it's not");
    }
  }, [firstTimeZone, setFirstTzHourInput, setFirstTzMinuteInput]);

  // When time is fetched display the time in the tz2 input
  useEffect(() => {
    const fetchedTime = secondTimeZone.formattedTime;
    if (fetchedTime) {
      const hours = fetchedTime.slice(0, 2);
      const minutes = fetchedTime.slice(3, 5);
      setSecondTzHourInput(hours);
      setSecondTzMinuteInput(minutes);
    } else {
      console.log("it's not");
    }
  }, [secondTimeZone, setSecondTzHourInput, setSecondTzMinuteInput]);

  // I think the problem here is this effect is being triggered by the default query states.
  // useEffect(() => {
  //   fetchTimeZone(
  //     secondTimeZone,
  //     "secondSelection",
  //     secondTzHourQuery,
  //     secondTzMinuteQuery
  //   );
  // }, [secondTimeZone, secondTzHourQuery, secondTzMinuteInput]);

  timeZoneList.forEach(timeZone => {
    let zoneName = timeZone.zoneName;
    zoneName = zoneName.replace(/_/g, " ");
    const countryName = timeZone.countryName;
    const slash = zoneName.lastIndexOf("/");
    const cityOnly = zoneName.substring(slash + 1);
    timeZone.cityName = cityOnly + ", " + countryName;
  });

  function fetchTimeZone(requestedTimezone, numberSelection, hour, minute) {
    let timeInput = hour + ":" + minute;

    const timeZoneOffset = new Date().toString().slice(28, 36);
    const currentDate = new Date().toString().slice(0, 11);
    const year = new Date().getFullYear();
    const unixTimeStamp = Math.round(
      Date.parse(currentDate + timeInput + ":000 " + timeZoneOffset + year) /
        1000
    );
    console.log(unixTimeStamp);
    const myLink =
      "http://api.timezonedb.com/v2.1/get-time-zone?key=H4DLI5SD6Q65&format=json&by=zone&zone=" +
      requestedTimezone +
      "&time=" +
      unixTimeStamp;
    console.log(myLink);
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
    fetchTimeZone(
      e.target.value,
      "firstSelection",
      firstTzHourQuery,
      firstTzMinuteQuery
    );
  }

  function handleSecondChange(e) {
    e.preventDefault();
    fetchTimeZone(
      e.target.value,
      "secondSelection",
      secondTzHourQuery,
      secondTzMinuteQuery
    );
  }

  function handleHours(e) {
    e.preventDefault();
    setFirstTzHourInput(e.target.value);
    setSecondTzHourQuery(e.target.value);
  }

  console.log("secondTimeZone:", secondTimeZone);
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
        timeZoneList={timeZoneList}
        hours={firstTzHourInput}
        setHours={setFirstTzHourInput}
        handleHours={handleHours}
        minutes={firstTzMinuteInput}
        setMinutes={setFirstTzMinuteInput}
      />
      <br />
      <TimeZones
        selectedTimeZone={secondTimeZone}
        handleChange={handleSecondChange}
        timeZoneList={timeZoneList}
        hours={secondTzHourInput}
        setHours={setSecondTzHourInput}
        minutes={secondTzMinuteInput}
        setMinutes={setSecondTzMinuteInput}
      />
      {/* <h2>other</h2>
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
      <button onClick={checkTime}>Check time</button> */}
    </div>
  );
}

export default App;
