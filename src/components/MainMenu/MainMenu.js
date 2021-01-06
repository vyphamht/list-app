import axios from "axios";
import React, { useState, useEffect } from "react";

const MainMenu = () => {
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");

  const buttonClicked = (e) => {
    e.preventDefault();
    setCategory(e.target.name);
  };
  useEffect(() => {
    axios
      .get(`/v2/products/${category}`, {
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        console.log(`${category} is fired`);
        const list = res.data.map((item) => <li key={item.id}>{item.name}</li>);
        setData(list);
      });
  }, [category]);

  return (
    <div>
      <button onClick={buttonClicked} name="gloves">
        Gloves
      </button>
      <button name="facemasks" onClick={buttonClicked}>
        Face Masks
      </button>
      <button name="beanies" onClick={buttonClicked}>
        Beanies
      </button>
      {data}
    </div>
  );
};

export default MainMenu;
