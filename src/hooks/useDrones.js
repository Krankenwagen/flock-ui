import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useDrones() {
  const [drones, setDrones] = useState([]);
  const [error, setError] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchDrones();
  }, []);

  const fetchDrones = count => {
    axios('https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/drones')
      .then(response => setDrones(response.data))
      .catch(err => retry(count, err));
  };

  const retry = (count = 0, err) => {
    count <= 10
      ? setTimeout(() => {
          fetchDrones(count + 1);
        }, 1000)
      : setError(err);
  };

  return drones;
}
