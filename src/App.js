import React, { useState, useEffect } from "react";
import "./App.css";
import TimeZones from "./components/TimeZones";

function App() {
  const [timeZoneList, setTimeZoneList] = useState([]);

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

  return (
    <div className="App">
      <h2>Pick a Timezone</h2>
      <TimeZones timeZoneList={timeZoneList} />
    </div>
  );
}

export default App;
