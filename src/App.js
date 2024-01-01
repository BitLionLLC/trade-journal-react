import logo from "./logo.svg";
import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [tradeList, setTradeList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/get-trades`)
      .then((res) => {
        setTradeList(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const formatSeconds = (seconds) => {
    let secondsLeft = seconds;
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft -= hours * 3600;
    const minutes = Math.floor(secondsLeft / 60);
    secondsLeft -= minutes * 60;

    return `${hours}h ${minutes}m ${Math.round(secondsLeft)}s`;
  };

  const instrumentMap = {
    306: "NAS100",
    307: "SPX500",
    309: "US30",
    314: "XAUUSD",
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Instrument</th>
            <th>Date Opened</th>
            <th>Time Opened</th>
            <th>Date Closed</th>
            <th>Time Closed</th>
            <th>Duration of Trade</th>
            <th>Lots</th>
            <th>Direction</th>
          </tr>
        </thead>
        <tbody>
          {tradeList.map((trade) => {
            return (
              <tr>
                <td>{trade[0]}</td>
                <td>{instrumentMap[trade[1]]}</td>
                <td>
                  {new Date(parseInt(trade[13])).toLocaleDateString("en-US")}
                </td>
                <td>
                  {new Date(parseInt(trade[13])).toLocaleTimeString("en-US")}
                </td>
                <td>
                  {new Date(parseInt(trade[14])).toLocaleDateString("en-US")}
                </td>
                <td>
                  {new Date(parseInt(trade[14])).toLocaleTimeString("en-US")}
                </td>
                <td>
                  {formatSeconds(
                    Math.abs(parseInt(trade[14]) - parseInt(trade[13])) / 1000
                  )}
                </td>
                <td>{trade[3]}</td>
                <td>{trade[4]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
