import axios from "axios";

const customApi = axios.create({
  baseURL: "/api/v1",
});

export default customApi;
