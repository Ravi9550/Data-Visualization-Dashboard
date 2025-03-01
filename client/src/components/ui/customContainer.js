import React from "react";
import Container from "react-bootstrap/Container";

function ChartContainer(props) {
  return (
    <Container
      className="chartContainer"
      style={{
        width: props.width,
        height: props.height,
        padding: props.padding,
      }}
    >
      <div className="headingContainers" style={{ display: props.isVisible }}>
        <h2>{props.heading}</h2>
        <p>{props.subheading}</p>
      </div>
      <section className="chartSectionContainer">{props.insideEliment}</section>
    </Container>
  );
}

export default ChartContainer;
