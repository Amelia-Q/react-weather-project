import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = { weather: {} };

  /* This gets the data */
  async componentDidMount() {
    const success = async ({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=10&appid=17a3e02a9cc47ed1eac90bc2f9c0012a`
      );
      this.setState({ weather: data });
    };

    const error = () => {};

    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    console.log(this.state);

    const { list } = this.state.weather;

    /* const { name, country } = data.city;
    const title = `<h1 class="title">Weather for ${name}, ${country}</h1>`; */

    if (!list) {
      return <div className="loader"></div>;
    }

    return (
      <>
        <h1 className="title">
          Weather for {this.state.weather.city.name},{" "}
          {this.state.weather.city.country}
        </h1>
        <form>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="You can type in your location here"
          />
        </form>
        <div className="allForecastItems">
          {list.map((item, index) => {
            if (index % 3 !== 0) {
              return;
            }
            return (
              <div className="forecastItems">
                <p className="forecastItem date">
                  {new Date(item.dt * 1000).toLocaleString()}
                </p>
                <p className="forecastItem temperature">
                  {Math.round(item.main.temp - 273.15)}ºC
                </p>
                <p className="forecastItem weather">
                  {item.weather[0].main.toUpperCase()}
                </p>
                <p className="forecastItem icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].main}
                  />
                </p>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
