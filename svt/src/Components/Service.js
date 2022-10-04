import axios from "axios";

let GetRobotics = () => {
  const config = {
    method: "GET",
    url: "/robots",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { GetRobotics };
