import React, { Fragment } from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spinner
          style={{ color: "#485CFF", width: "70px", height: "70px" }}
          animation="border"
        />
      </div>
    </Fragment>
  );
}

export default Loading;
