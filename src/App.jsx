import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
return (
  <div className="container">
    <Header data={data} />
    <Main data={data} setData={setData}/>
    <Footer data={data} />
  </div>
);
}

export default App;
