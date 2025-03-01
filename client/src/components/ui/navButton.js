import React from "react";
import { Button } from "react-bootstrap";

function NavButton(props) {
  return (
    <div>
      <Button variant="primary">{props.title}</Button>
    </div>
  );
}

export default NavButton;
