import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Item = (props) => {
  const [available, setAvailable] = useState("waiting a bit...");
  useEffect(() => {
    axios
      .get(`/v2/availability/${props.manufacturer}`, {
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        const data = res.data.response;
        const found = data
          .find((item) => item.id === props.unique.toUpperCase())
          .DATAPAYLOAD.slice(50, -31);
        setAvailable(found);
      })

      .catch((err) => console.log(err));
  }, [props.manufacturer, props.unique]);
  return (
    <div id={props.unique}>
      <h3>Product details:</h3>
      <p>1. Name: {props.name}</p>
      <p>2. Colours: {props.color}</p>
      <p>3. Price: {props.price}</p>
      <p>4. Manufacturer: {props.manufacturer}</p>
      <p>5. Availability: {available}</p>
      <button>
        <Link to="/">Close</Link>
      </button>
    </div>
  );
};

export default Item;
