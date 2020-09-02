import React from "react";
import { useState, useEffect } from "react";
import { Cards, Charts, Country } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import logo from "./images/logo.png";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { Switch as Toogle, FormControlLabel } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const themeObject = {
  palette: {
    type: "light",
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
};

export const APP = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("global");
  const [theme,setTheme] = useState(themeObject);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    setCountry(country);
  };

  const toogleDarkMode = async ()=>{
  const {
    palette: { type },
  } = theme;    console.log(type)
    const updatedTheme = {
      // ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light",
      },
    };
    setTheme(updatedTheme);
    localStorage.setItem('theme',type === "light" ? "dark" : "light")
  };

  

  useEffect(() => {
      setData(handleCountryChange(country));
      if(localStorage.getItem('theme') === null) 
      {
        localStorage.setItem('theme','light')
      }
      else 
      {
         const type = localStorage.getItem('theme');
             const updatedTheme = {
      // ...theme,
          palette: {
         ...theme.palette,
            type: type === "light" ? "light" : "dark",
          },
        };
        setTheme(updatedTheme);        
      }
      
    // eslint-disable-next-line
  }, []);


    const muiTheme = createMuiTheme(theme)

  return (
    <MuiThemeProvider theme={muiTheme}>
    <CssBaseline />
    <div className={styles.container}>
    <img src={logo} className={styles.image} alt="logo" />
    <FormControlLabel control={<Toogle onClick={toogleDarkMode} checked={theme.palette.type==='dark'? true : false} />} />
      <Cards data={data} />
      <Country handleCountryChange={handleCountryChange} />
      <Charts data={data} country={country} />
    </div>
    </MuiThemeProvider>
  );
}

