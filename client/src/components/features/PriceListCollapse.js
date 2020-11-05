import React, { Component, useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import tw from "twin.macro";
import styled from "styled-components";
import TwoColWithSteps from "./TwoColWithSteps";

const collapseTitle = styled.div`
  ${tw``}
  .imageContainer {
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-2xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;



const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="white" onClick={toggle} style={{ marginBottom: "1rem", borderBlockColor: "none"}}>
          <div>
              
              <p style={{letterSpacing: "0.025em", fontWeight: "700", fontSize: "1.5rem", lineHeight: "1", marginTop: "1rem"}}>Vereinsmitglied werden</p>
             
        <i
          style={{
            cursor: "pointer",
            color: "#696969",
            fontSize: "50px"
          }}
          
          class="large material-icons"
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
