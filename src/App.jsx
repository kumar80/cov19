import React from "react";
import { useState, useEffect } from "react";
import { Cards, Charts, Country } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import logo from "./images/logo.png";

export const APP = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("global");

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    setCountry(country);
  };

  useEffect(() => {
    setData(handleCountryChange(country));
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.image} alt="logo" />
      <Cards data={data} />
      <Country handleCountryChange={handleCountryChange} />
      <Charts data={data} country={country} />
    </div>
  );
};
