import Input from "./Input.jsx";

const PersonForm = ({
  onSubmit,
  handleInputChange,
  handleNumChange,
  newName,
  newNumber,
}) => (
  <form onSubmit={onSubmit}>
    <Input
      id="name"
      type="text"
      label="Name: "
      value={newName}
      onChange={handleInputChange}
    />
    <Input
      id="number"
      type="text"
      label="Number: "
      value={newNumber}
      onChange={handleNumChange}
    />
    <button type="submit">add</button>
  </form>
);

export default PersonForm;
