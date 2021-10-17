import React, { useState } from 'react';
import './App.css';
import { Button, Input } from '@material-ui/core';
import axios from 'axios';


function App() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [timezone, setTimezone] = useState("");
  const [cityname, setCityname] = useState("");
  const [time, setTime] = useState("");


  const findtimezone = async () => {
    const city = "Luxembourg"
    const url = `http://worldtimeapi.org/api/timezone/${country}`;
    const response = await axios.get(url);

    setResult(response.data);
    return
  }
  const handleCountry = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value)

  }
  const handleCity = (event) => {
    console.log(event.target.value);

    setCity(event.target.value)
  }
  const onCountry = async (data) => {
    const area = data.split("/");
    const city = area[1];
    const url = `http://worldtimeapi.org/api/timezone/${country}/${city}`;
    const response = await axios.get(url);
    setTimezone(response.data.utc_datetime)
    setCityname(response.data.timezone)
    setTime(response.data.utc_offset)
  }

  return (
    <div className="app">
      <div className="inputBox_field">
        <h1>WORLD</h1>
        <h2>Time Zone</h2>

        <Input placeholder="Enter the city Name" onChange={handleCountry} value={country} /><br></br>

        <Button className="button" variant="contained" color="primary" type="submit"
          onClick={findtimezone}>
          Search
        </Button>
        <br></br>

        {result.length > 0 &&
          <div>


            <select value={city} onChange={(e) => onCountry(e.target.value)}>
              {result.map(function (item, i) {
                return <option key={i} value={item}>{item}</option>
              })}

            </select>
          </div>

        }
        <div>
          {timezone.length > 0 &&
            <div>
            
              <h1>Time:{time}</h1>
              <h1>Date:{timezone}</h1>
              <h1>Location:{cityname}</h1>
              
            </div>
          }
        </div>
      </div>
    </div>
  );
}


export default App;
