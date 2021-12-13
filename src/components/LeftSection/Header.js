
export const Header = ({ countries, country, setCountry }) => {
    const handleChange = async (e) => {
        setCountry(e.target.value)
    }
    return (
        <header>
            <h1 className='header-logo'>COVID-19 Tracker</h1>
            <select value={country} onChange={handleChange}>
                <option value='World Wide'>World Wide</option>
                {
                    countries.map((country, index) => {
                        return <option key={index} value={country.value}>{country.name}</option>
                    })
                }
            </select>
        </header>
    );
}