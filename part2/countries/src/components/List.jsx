const List = ({ value }) => {
  if (value.length === 1) {
    const country = value[0];
    return (
      <div>
        <h1>{country.name}</h1>
        <h3>Capital: {country.capital}</h3>
        <h3>Area: {country.area}</h3>
        <h1>Languages</h1>
        <ul>
          {Object.entries(country.languages).map(([code, language]) => (
            <li key={code}>{language}</li>
          ))}
        </ul>
        <span className="flag">{country.flag}</span>
      </div>
    );
  } else if (value.length !== 1 && value.length <= 10) {
    return (
      <ul>
        {value.map((country) => (
          <li key={country.key}>{country.name}</li>
        ))}
      </ul>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default List;
