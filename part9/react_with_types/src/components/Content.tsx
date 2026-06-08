interface Content {
  name: string;
  count: number;
}

const Content = ({ name, count }: Content) => {
  return (
    <p>
      {name} {count}
    </p>
  );
};

export default Content;
