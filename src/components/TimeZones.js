import React from "react";

function TimeZones({
  selectedTimeZone,
  handleChange,
  handleSubmit,
  timeZoneList
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
        <button>Add time Zone</button>
      </form>
      <h3>{selectedTimeZone.cityName}</h3>
      <input type="text" value={selectedTimeZone.formattedTime} />
    </div>
  );
}

export default TimeZones;
