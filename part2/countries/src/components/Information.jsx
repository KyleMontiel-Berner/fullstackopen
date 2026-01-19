const Information = ({ country }) => {
  console.log("info received country", country);
  return (
    <div>
      <h1>{country.name}</h1>
      <h3>Capital: {country.capital[0]}</h3>
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
};

export default Information;
