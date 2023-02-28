import React, { Component } from "react";
import axios from "axios";

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

    if (!list) {
      return <h1>Loading...</h1>;
    }

    return (
      <>
        {list.map((item) => {
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
                  src="http://openweathermap.org/img/wn/{
              item.weather[0].icon
              }.png"
                  alt={item.weather[0].main}
                />
              </p>
            </div>
          );
        })}
      </>
    );
  }
}

export default App;
