import React, { useEffect, useState } from "react";
import * as Service from "./Service";
import CardTemplate from "./CardTemplate";
import { BiSort } from "react-icons/bi";

function Cards() {
  const [robotData, setRobotData] = useState({
    robots: [],
    robotComponents: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    Service.GetRobotics().then(onGetRobotSuccess).catch(onGetRobotError);
  }, []);

  const onGetRobotSuccess = (response) => {
    let arrOfRobots = response.data;

    setRobotData((prevState) => {
      const rd = { ...prevState };
      rd.robots = arrOfRobots;
      rd.robotComponents = arrOfRobots.map(mapArrOfRobots);

      return rd;
    });
  };

  const onGetRobotError = (response) => {
    console.error(response);
  };

  const mapArrOfRobots = (robot, idxPos) => {
    return <CardTemplate robotData={robot} key={idxPos} />;
  };

  const handleSearchTem = (e) => {
    let term = e.target.value;
    setSearchTerm(term);
  };

  const filterRobots = (robots) => {
    return robots.robotId == searchTerm;
  };

  const filteredRobots = robotData.robots.filter(filterRobots);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...robotData.robots].sort((a, b) => {
        return a[col] - b[col];
      });
      setRobotData((prevState) => {
        const rd = { ...prevState };
        rd.robots = sorted;
        rd.robotComponents = sorted.map(mapArrOfRobots);

        return rd;
      });
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...robotData.robots].sort((a, b) => {
        return b[col] - a[col];
      });
      setRobotData((prevState) => {
        const rd = { ...prevState };
        rd.robots = sorted;
        rd.robotComponents = sorted.map(mapArrOfRobots);

        return rd;
      });
      setOrder("ASC");
    }
  };

  return (
    <div className="container">
      <div className="table-container">
        <div className="input-container">
          <label className="search-label" htmlFor="search-box">
            Search By Id
          </label>
          <input
            name="search-box"
            onChange={handleSearchTem}
            className="search-input"
            type="text"
            placeholder="Search..."
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th
                onClick={() => sorting("robotId")}
                className="hover"
                scope="col"
              >
                <BiSort /> Robot ID
              </th>
              <th
                onClick={() => sorting("batteryLevel")}
                className="hover"
                scope="col"
              >
                <BiSort /> Battery Level
              </th>
              <th onClick={() => sorting("y")} className="hover" scope="col">
                <BiSort /> Y Location
              </th>
              <th onClick={() => sorting("x")} className="hover" scope="col">
                <BiSort /> X Location
              </th>
            </tr>
          </thead>
          {searchTerm > 0
            ? filteredRobots.map(mapArrOfRobots)
            : robotData.robots.map(mapArrOfRobots)}
        </table>
      </div>
    </div>
  );
}

export default Cards;
