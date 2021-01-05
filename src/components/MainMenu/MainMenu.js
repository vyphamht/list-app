import axios from "axios";
import React, { useState } from "react";

const MainMenu = () => {
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");

  const search = (e) => {
    e.preventDefault();
    setCategory(e.target.name);
    console.log("clicked");
    console.log(category);
    if (category.length === 0) {
      setData("loadingggggggg");
    } else {
      axios
        .get(`/v2/products/${category}`, {
          headers: {
            "access-control-allow-origin": "*",
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((res) => {
          console.log("button clicked");
          const list = res.data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ));
          setData(list);
        });
    }
  };

  return (
    <div>
      <button onClick={search} name="gloves">
        Gloves
      </button>
      <button name="facemasks" onClick={search}>
        Face Masks
      </button>
      <button name="beanies" onClick={search}>
        Beanies
      </button>
      {data}
    </div>
  );
};

export default MainMenu;
