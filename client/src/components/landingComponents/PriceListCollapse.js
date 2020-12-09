import React, { useState } from "react";
import { Collapse, Button } from "reactstrap";

import TwoColWithSteps from "./IconBoard";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button
        color="white"
        onClick={toggle}
        style={{ marginBottom: "1rem", borderBlockColor: "none" }}
      >
        <div>
          <p
            style={{
              letterSpacing: "0.025em",
              fontWeight: "700",
              fontSize: "1.5rem",
              lineHeight: "1",
              marginTop: "1rem",
            }}
          >
            Vereinsmitglied werden
          </p>

          <i
            style={{
              cursor: "pointer",
              color: "#696969",
              fontSize: "50px",
            }}
            className="large material-icons"
          >
            expand_more
          </i>
        </div>
      </Button>
      <Collapse isOpen={isOpen}>
        <TwoColWithSteps />
      </Collapse>
    </div>
  );
};

export default Example;
