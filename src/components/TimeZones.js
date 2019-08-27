import React from "react";

function TimeZones({
  selectedTimeZone,
  handleChange,
  handleSubmit,
  timeZoneList,
  hours,
  setHours,
  minutes,
  setMinutes
}) {
  return (
    <div>
      <h2>Enter a Timezone</h2>
      <form onSubmit={handleSubmit}>
        <select name="timezones" id="timezones" onChange={handleChange}>
          <option />
          {timeZoneList.map((timeZone, i) => (
            <option value={timeZone.zoneName} key={i}>
              {timeZone.cityName}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>
          Hours
          <input
            type="text"
            value={hours}
            onChange={e => setHours(e.target.value)}
          />
        </label>
        <label>
          Minutes
          <input
            type="text"
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
          />
        </label>
      </form>
      <h3>{selectedTimeZone.cityName}</h3>
      <input type="text" value={selectedTimeZone.formattedTime} />
    </div>
  );
}

export default TimeZones;
