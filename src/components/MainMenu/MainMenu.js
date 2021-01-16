import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Item from "../Item/Item";
import "./MainMenu.css";
import LoaderNow from "../Loader/Loader";

const MainMenu = () => {
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");

  const buttonClicked = async (e) => {
    e.preventDefault();
    await setCategory(e.target.name);
    setData(<LoaderNow />);
  };
  let url = `/v2/products/${category}`;
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        console.log(`${category} is fired`);

        const list = res.data.map((item) => (
          <Router key={item.id}>
            <div className="list">
              <li>
                {item.name}{" "}
                <button>
                  <Link to={`/${item.id}`}>Check</Link>
                </button>
              </li>
            </div>

            <Switch>
              <Route path={`/${item.id}`}>
                <Item
                  unique={item.id}
                  name={item.name}
                  color={item.color.map((color) => (
                    <li key={color}>{color}</li>
                  ))}
                  price={item.price}
                  manufacturer={item.manufacturer}
                />
              </Route>
            </Switch>
          </Router>
        ));
        setData(
          <div>
            <h1>Below is the list of {category}</h1>
            <div>{list}</div>
          </div>
        );
      });
  }, [category, url]);

  return (
    <Router>
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
    </Router>
  );
};

export default MainMenu;
