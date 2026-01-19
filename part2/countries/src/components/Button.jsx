import Information from "./Information";
import { useState } from "react";

const Button = ({ country }) => {
  const [showList, setShowList] = useState(false);

  return (
    <div>
      <button onClick={() => setShowList(!showList)}>Show</button>
      {showList && <Information country={country} />}
    </div>
  );
};

export default Button;
