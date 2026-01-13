const Input = ({ id, type, label, value, onChange }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type} value={value} onChange={onChange} />
  </>
);

export default Input