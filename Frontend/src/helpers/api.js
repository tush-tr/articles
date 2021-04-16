import axios from "axios";

export default axios.create({
    // backend base URL
    baseURL: "http://localhost:5000/api"
});