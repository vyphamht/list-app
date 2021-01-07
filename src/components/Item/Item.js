import React from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div id={props.unique}>
      <h3>Product details:</h3>
      <p>1. Name: {props.name}</p>
      <p>2. Colours: {props.color}</p>
      <p>3. Price: {props.price}</p>
      <p>4. Manufacturer: {props.manufacturer}</p>
      <button>
        <Link to="/">Close</Link>
      </button>
    </div>
  );
};

export default Item;
