import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const _getHeaders = () => {
  const token = localStorage.getItem("unige-connect_token");
  return { Authorization: `Bearer ${token}` };
};

// eslint-disable-next-line no-unused-vars
const get = (endpoint, id) => {
  if (id)
    return axios.get(REACT_APP_API_URL + endpoint + "/" + id, {
      headers: _getHeaders(),
    });
  return axios.get(REACT_APP_API_URL + endpoint, { headers: _getHeaders() });
};

// eslint-disable-next-line no-unused-vars
const post = (endpoint, data) => {
  return axios.post(REACT_APP_API_URL + endpoint, data, {
    headers: _getHeaders(),
  });
};

class WebApiClient {
  
  // Make the method async so we can use await
  async CreateGroup() {
    try {
      // Make the GET request using the get function
      const response = await get("/test");

      // `response` is the result of the axios request, which contains `data`
      alert(response.data.number);  // Access the response data here
      return response;
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    }
  }
}

export default WebApiClient;
