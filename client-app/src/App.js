import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import './bootstrap.css';
// Source code imports
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App(props) {
  // create the react component state we'll use to store our data
  const [users, setUsers] = useState([]);
  const [jwt, setjwt] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:9999/v1/user-items/")
      // handle success
      .then((response) => {
        const data = response.data;
        console.log(data);

        const parsedData = data.map((user) => ({ ...user, }));

        // set our react state w/data from the server!
        setUsers(parsedData);
      });
  }, []);

  const updateUser = (UserName) => {
    console.log("updateUser for ", UserName);
    // Go thru all items; change the desired one; return a new array which has our updated item and all the other items.
    setUsers((prevState) => {
      return prevState.map((user) => {
        console.log(user);

        // If it's the desired item, flip the value of `item.checked`
        if (UserName === user.username) {
          console.log("desired item ", user);

          // This could also be done as `return { ...item, checked: !item.checked }`
          const newUser = {
            username: user.username,
            password: user.password
          };

          console.log("updated item ", newUser);
          return newUser;
        }

        // If it's not the desired item, return it unchanged
        return { ...user }; // IMPORTANT: Object destructuring like this creates a **new** object w/the same values
      });
    });
  };

  console.log("App.state.items is ", users);

  // Data being retrieved from server
  if (!users.length) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="App">
        <Router>
          <Header></Header>

          <h1>User App</h1>

          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
          <Footer></Footer>
        </Router>
      </div>
    );
  }
}

export default App;