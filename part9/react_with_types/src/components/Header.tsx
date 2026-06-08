interface Header {
  courseName: string;
}
const Header = ({ courseName }: Header) => {
  return <h1>{courseName}</h1>;
};

export default Header;
