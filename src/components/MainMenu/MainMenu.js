import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Item from "../Item/Item";
import "./MainMenu.css";
import LoaderNow from "../Loader/Loader";

const cors = "https://cors-anywhere.herokuapp.com/";

const MainMenu = () => {
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");
  const [heading, setHeading] = useState("");

  const buttonClicked = async (e) => {
    e.preventDefault();
    await setCategory(e.target.name);
    await setHeading(`List of ${e.target.name}`);

    setData(<LoaderNow />);
  };

  let url = `${cors}https://bad-api-assignment.reaktor.com/v2/products/${category}`;
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, PUT, POST, DELETE, HEAD, OPTIONS",
          "Content-type": "application/json; charset=UTF-8",
          // proxy: {
          //   target: "https://vyphamht-list-app.web.app/",
          // },
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
                  <Link to={`/${item.id}`}>See Detail</Link>
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
            <div>{list}</div>
          </div>
        );
      });
  }, [category, url]);

  return (
    <Router>
      <div className="menu">
        <div className="nav">
          <button onClick={buttonClicked} name="gloves">
            Gloves
          </button>
          <button name="facemasks" onClick={buttonClicked}>
            Face Masks
          </button>
          <button name="beanies" onClick={buttonClicked}>
            Beanies
          </button>
        </div>
        <h1>{heading}</h1>
        {data}
      </div>
    </Router>
  );
};

export default MainMenu;
