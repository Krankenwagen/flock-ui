import React, { useState } from 'react';
import useDrones from '../hooks/useDrones';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const calculateCrashRate = (drone, riskRate) => {
  const crashRate =
    drone.numFlights === 0 ? 0 : (drone.numCrashes / drone.numFlights) * 100;
  return crashRate >= riskRate[0] && crashRate <= riskRate[1];
};

const ListItem = (drone, riskRate) => {
  return calculateCrashRate(drone, riskRate) ? (
    <div key={drone.doneId}>
      <h4>{drone.name}</h4>
      <p>
        {drone.price} {drone.currency}
      </p>
      <p>Crashes: {drone.numCrashes}</p>
      <p>Flights: {drone.numFlights}</p>
    </div>
  ) : null;
};

export default function List() {
  const [riskRate, setRiskRate] = useState([0, 100]);
  const drones = useDrones();
  console.log(drones);
  return (
    <div>
      {drones.length > 0 ? (
        drones.map(drone => {
          return ListItem(drone, riskRate);
        })
      ) : (
        <p>Sorry we're out of drones'</p>
      )}
      <div>
        <Range
          min={0}
          max={100}
          value={riskRate}
          onChange={value => setRiskRate(value)}
        />
      </div>
      {drones.error ? <h1>{drones.error}</h1> : null}
    </div>
  );
}
