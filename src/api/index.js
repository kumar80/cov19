import axios from "axios";
const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  const reqUrl = url + (country==="global"?"":`/countries/${country}`);
  //console.log(typeof(`${2+2}`))
  try {
    const response = await axios.get(reqUrl);
    const { data } = response;
    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };
    return modifiedData;
    //        console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((d) => ({
      confirmed: d.confirmed.total,
      deaths: d.deaths.total,
      date: d.reportDate,
    }));
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const countryFetcher  = async ()=>{
  try{
    const {data :{countries}} = await  axios.get(`${url}/countries`);
    return countries;
 //   console.log(countries);
  }catch(err) {
    
    console.error(err);
  }
}