import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Item.css";

const cors = "https://cors-anywhere.herokuapp.com/";

const Item = (props) => {
  const [available, setAvailable] = useState("waiting a bit...");
  useEffect(() => {
    axios
      .get(
        `${cors}https://bad-api-assignment.reaktor.com/v2/availability/${props.manufacturer}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        const data = res.data.response;
        const found = data
          .find((item) => item.id === props.unique.toUpperCase())
          .DATAPAYLOAD.slice(50, -31);
        setAvailable(found);
      })

      .catch((err) => {
        console.log(err);
        setAvailable(`close ${props.name} and try to reopen it!`);
      });
  }, [props.manufacturer, props.unique, props.name]);
  return (
    <div id={props.unique} className="item_detail">
      <div>
        <h3>Product details:</h3>
        <p>1. Name: {props.name}</p>
        <p>2. Colours: {props.color}</p>
        <p>3. Price: {props.price}</p>
        <p>4. Manufacturer: {props.manufacturer}</p>
        <p>5. Availability: {available}</p>
      </div>
      <div>
        <button>
          <Link to="/">Close</Link>
        </button>
      </div>
    </div>
  );
};

export default Item;
