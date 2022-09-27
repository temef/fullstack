import Filter from './filter.js'
import Country from './country.js'
import { useEffect, useState } from 'react'
import axios from 'axios'



const Countries = () => {

    const [newFilter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilter = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }

    let visibleCountries = countries.filter(countries =>
        countries.name.common.toLowerCase().includes(newFilter.toLowerCase()))




    return (
        <>
            <Filter
                newFilter={newFilter}
                handleFilter={handleFilter}
            />
            {(visibleCountries.length === 1) ? 
            <Country
                key={visibleCountries[0].name.common}
                countryName={visibleCountries[0].name.common}
                capital={visibleCountries[0].capital}
                area={visibleCountries[0].area}
                population={visibleCountries[0].population}
                flag={visibleCountries[0].flags.png}
                languages={visibleCountries[0].languages}
                // {...visibleCountries[0]} testi
            /> :
                <div> 
                {(visibleCountries.length > 10) ? 'Too many matches, sepcify another filter' :
                    visibleCountries.map(country =>
                        <div key={country.name.common}>
                            <b> {country.name.common} <button onClick={() => {setFilter(country.name.common)}}>Show</button> </b>
                        </div>
                    )}
                </div>
            }
        </>
    )

}
export default Countries