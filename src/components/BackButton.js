import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function BackButton(props) {
  return (
    <Link to={"/response-list"} style={{ textDecoration: "none" }}>
      <Button color="primary" variant="contained">
        {"Ga terug"}
      </Button>
    </Link>
  );
}
