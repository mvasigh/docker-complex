import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

const fetchValues = () => {
  return axios.get("/api/values/current");
};

const fetchIndexes = () => {
  return axios.get("/api/values/all");
};

const Fib = () => {
  const [indices, setIndices] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues().then(({ data }) => setValues(data));
    fetchIndexes().then(({ data }) => setIndices(data));
  }, []);

  const calculatedValues = useMemo(() => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <li key={key}>
          For index {key} I calculated {values[key]}
        </li>
      );
    }
  }, [values]);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    await axios.post("/api/values", {
      index
    });
    setIndex('');
  }, [index]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={e => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {indices.map(({ number }) => number).join(", ")}
      <h3>Calculated values:</h3>
      <ul>{calculatedValues}</ul>
    </div>
  );
};

export default Fib;
