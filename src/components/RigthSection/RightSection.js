import { CountryList } from "./CountryList";

export const RightSection = ({tableData}) => {
    return (
        <div className='right-container'>
            <CountryList tableData={tableData}/>
        </div>
    );
}