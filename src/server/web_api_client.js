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
  
  CreateGroup(props) {
    const data = new FormData();
    
    data.append("name", props.name)
    data.append("topic", props.topic)
    data.append("description", props.description)
    data.append("type", props.type)
    data.append("created_by", props.created_by)

    return post("/api/create-group", data)
  }
}

export default WebApiClient;
