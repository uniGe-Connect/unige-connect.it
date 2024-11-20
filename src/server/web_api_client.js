import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const _getHeaders = () => {
  const token = localStorage.getItem('unige-connect_token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// eslint-disable-next-line no-unused-vars
const get = (endpoint, id) => {
  if (id) {
    return axios.get(`${REACT_APP_API_URL}${endpoint}/${id}`, {
      headers: _getHeaders(),
    });
  }
  return axios.get(REACT_APP_API_URL + endpoint, { headers: _getHeaders() });
};

// eslint-disable-next-line no-unused-vars
const post = (endpoint, data) => {
  return axios.post(`${REACT_APP_API_URL}${endpoint}`, data, {
    headers: _getHeaders(),
  });
};

// eslint-disable-next-line no-unused-vars
const del = (endpoint, id) => {
  if (id) {
    return axios.delete(`${REACT_APP_API_URL}${endpoint}/${id}`, {
      headers: _getHeaders(),
    });
  }
  return axios.delete(`${REACT_APP_API_URL}${endpoint}`, { headers: _getHeaders() });
};

// eslint-disable-next-line no-unused-vars
const put = (endpoint, id, data) => {
  if (id) {
    return axios.put(`${REACT_APP_API_URL}${endpoint}/${id}`, data, {
      headers: _getHeaders(),
    });
  }
  return axios.put(`${REACT_APP_API_URL}${endpoint}`, data, { headers: _getHeaders() });
};

class WebApiClient {
  createGroup(props) {
    const data = new FormData();
    data.append('name', props.name);
    data.append('topic', props.topic);
    data.append('description', props.description);
    data.append('type', props.type);
    data.append('owner_id', props.owner_id);
    return post('/groups/create-group', data);
  }

  updateGroup(groupId, props) {
    const data = new FormData();
    data.append('name', props.name);
    data.append('topic', props.topic);
    data.append('description', props.description);
    data.append('type', props.type);
    return put('/groups', groupId, data);
  }

  deleteGroup(groupId) {
    return del('/groups', groupId);
  }

  getOwnedGroups() {
    return get('/groups/get-your-groups');
  }

  getGroupCount() {
    return get('/groups/get-groups-num');
  };
}

export default WebApiClient;
