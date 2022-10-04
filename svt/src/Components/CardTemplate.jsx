import React from "react";

function CardTemplate(props) {
  const robot = props.robotData;

  return (
    <tbody>
      <tr>
        <td>{robot.robotId}</td>
        <td>{robot.batteryLevel}</td>
        <td>{robot.y}</td>
        <td>{robot.x}</td>
      </tr>
    </tbody>
  );
}

export default CardTemplate;
