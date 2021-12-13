

export const CountryList = ({ tableData }) => {
    const data = tableData.sort((a, b) => b.cases - a.cases);
    return (
        <div className='country-data'>
            <h2>Live Country Cases</h2>
            <ul>
                {data.map((item, index) =>
                    <li key={index.toString()}>
                        <span>{item.country}</span>
                        <span>{item.cases}</span>
                    </li>
                )}
            </ul>
        </div>

    )
}