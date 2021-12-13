import { useState, useEffect } from "react";
import { LeftSection } from "./components/LeftSection/LeftSection";
import { RightSection } from "./components/RigthSection/RightSection";

function App() {
  // For Select Box
  const [countries, setCountries] = useState([]);

  // Set Country Value
  const [country, setCountry] = useState('World Wide');

  // For Infromation Section
  const [countryInfo, setCountryInfo] = useState({});

  // For Right Section
  const [tableData, setTableData] = useState([]);

  // For Chart Data
  const [chatData, setChatData] = useState({});
  const [caseType, setCaseType] = useState('cases')

  const builtChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;

    for (let date in data[casesType]) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };


  useEffect(() => {
    async function fetchData() {
      const resp = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await resp.json();

      // For Select Box
      setCountries(data.map(item => {
        return {
          name: item.country,
          value: item.countryInfo.iso3
        }
      }));

      // For Table Data
      setTableData(data.map(item => {
        return {
          country: item.country,
          cases: item.cases
        }
      }));
    }

    fetchData();

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      const data = await response.json();
      const processData = builtChartData(data, caseType);
      setChatData(processData);
    }
    fetchData()
  }, [caseType])

  useEffect(() => {
    async function fetchApi() {
      const url = country === 'World Wide'
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${country}`;
      const resp = await fetch(url);
      const data = await resp.json();
      setCountryInfo(data)
    }
    fetchApi()
  }, [country])

  return (
    <div className='main-container'>
      <LeftSection
        countries={countries}
        country={country}
        setCountry={setCountry}
        countryInfo={countryInfo}
        data={chatData}
        caseType={caseType}
        setCaseType={setCaseType}
      />
      <RightSection tableData={tableData} />
    </div>
  );
}

export default App;
