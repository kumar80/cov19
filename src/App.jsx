import React from "react";
import { useState, useEffect } from "react";
import { Cards, Charts, Country } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { Switch as Toogle, FormControlLabel } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/styles/withStyles";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";

const stylesJSS = {
  toogleButton: {
    height: 100,
    width: 50,
    position: "absolute",
    left: 1200,
    bottom: 280,
  },
  themelight: {
    opacity: 1,
    width: 50,
    height: 30,
  },
  themedark: {
    opacity: 0,
    width: 50,
    height: 30,
  },
};
const themeObject = {
  palette: {
    type: "light",
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
    },
  },
};

const APP = (props) => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("global");
  const [theme, setTheme] = useState(themeObject);
  const { classes } = props;
  const [themeTransition, setThemeTrans] = useState(true);
  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    setCountry(country);
  };

  const toogleDarkMode = async () => {
    setThemeTrans(false);
    const {
      palette: { type },
    } = theme;
    // console.log(type);
    const updatedTheme = {
      // ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light",
      },
    };
    localStorage.setItem("theme", type === "light" ? "dark" : "light");

    setTheme(updatedTheme);
    setThemeTrans(true);
  };

  useEffect(() => {
    setData(handleCountryChange(country));
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    } else {
      const type = localStorage.getItem("theme");
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

  const muiTheme = createMuiTheme(theme);
  const moon = (
    <svg
      id="moon"
      className={classes.themelight}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  const sun = (
    <svg
      id="sun"
      className={classes.themelight}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" width="20px" height="20px" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );

  const buttonIcon = () => {
    if (theme.palette.type === "light") {
      return moon;
    } else {
      return sun;
    }
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />

      <Fade
        in={themeTransition}
        timeout={{ appear: 7000, enter: 1000, exit: 1000 }}
      >
        <div className={styles.container}>
          <Button
            id="toogleButton"
            onClick={toogleDarkMode}
            className={classes.toogleButton}
            // disabled={theme.palette.type === "dark" ? true : false}
          >
            {buttonIcon()}
          </Button>
          <Cards data={data} />
          <Country handleCountryChange={handleCountryChange} />
          <Charts data={data} country={country} />
        </div>
      </Fade>
    </MuiThemeProvider>
  );
};

export default withStyles(stylesJSS)(APP);
