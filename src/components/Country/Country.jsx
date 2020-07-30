import React, { useEffect, useState } from "react";
import {
  NativeSelect,
  FormControl,
} from "@material-ui/core";
import styles from "./Country.module.css";
import { countryFetcher } from "../../api/index";


const Country = (props) => {
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setCountry(await countryFetcher());
    };
    fetchCountries();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      
      <NativeSelect defaultValue="" onChange={ (e)=>{ props.handleCountryChange(e.target.value) }} >
        <option value="global">Worlwide</option>
        {country.map((d,index) => (
          <option key={index} value={d.name} > {d.name}</option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Country;
