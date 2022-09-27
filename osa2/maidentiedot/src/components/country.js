import Weather from './weather.js'


const Country = ({countryName, capital, area, flag, languages, population}) => { 

    

    return(
            <div>
                <h1>{countryName}</h1>
                <p><span style={{fontWeight: 'bold'}}>Capital:</span> {capital}</p>
                <p><span style={{fontWeight: 'bold'}}>Area:</span> {area}</p>
                <p><span style={{fontWeight: 'bold'}}>Population:</span> {population}</p>
                <h2>Languages:</h2>
                <ul>
                    {languages && Object.values(languages).map((language) => 
                    <li key={language}> {language} </li>
                )}
                </ul>
                <img src={flag} alt='flag'/>
                <Weather 
                name={capital}
                />
            </div>
        )

}

export default Country