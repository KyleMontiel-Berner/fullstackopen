import Input from "./Input.jsx"

const Filter = ({ id, type, onChange, value }) => (
  <>
    <Input
      id={id}
      type={type}
      label="filter shown with"
      onChange={onChange}
      value={value}
    />
  </>
);

export default Filter