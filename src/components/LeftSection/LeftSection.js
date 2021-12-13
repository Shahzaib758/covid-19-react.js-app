import { Header } from "./Header";
import { InfoBox } from "./InfoBox";
import { LineChart } from "./LineChart";

export const LeftSection = ({ countries, country, setCountry, countryInfo, data, caseType, setCaseType }) => {
    return (
        <div className='left-container'>
            <Header countries={countries} country={country} setCountry={setCountry} />
            <div className='info-container'>
                <InfoBox
                    title='Corona Cases'
                    cases={countryInfo.todayCases}
                    total={countryInfo.cases}
                />
                <InfoBox
                    title='Recovery'
                    cases={countryInfo.todayRecovered}
                    total={countryInfo.recovered}
                />
                <InfoBox
                    title='Death'
                    cases={countryInfo.todayDeaths}
                    total={countryInfo.deaths}
                />
            </div>
            <LineChart data={data} caseType={caseType} setCaseType={setCaseType}/>
        </div>
    );
}