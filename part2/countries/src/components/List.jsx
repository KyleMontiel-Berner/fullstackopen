import Button from "./Button";
import Information from "./Information";

const List = ({ value }) => {
  console.log("List received:", value);
  console.log("value.length", value.length);

  if (value.length === 1) {
    return <Information country={value[0]} />;
  } else if (value.length !== 1 && value.length <= 10) {
    return (
      <ul>
        {value.map((country) => (
          <div key={country.key}>
            <li>{country.name}</li>
            <Button country={country} />
          </div>
        ))}
      </ul>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default List;
