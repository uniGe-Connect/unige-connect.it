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
    return post('/groups', props);
  }

  updateGroup(groupId, props) {
    return put('/groups', groupId, props);
  }

  deleteGroup(groupId) {
    return del('/groups', groupId);
  }

  joinGroup(groupId) {
    return post(`/groups/${groupId}/members`);
  }

  getOwnedGroups() {
    return get('/groups?owner=mine');
  }

  getGroupCount() {
    return get('/groups/count');
  };

  getGroups() {
    return get('/groups');
  }

  getGroupInfo(id) {
    return get('/groups', id);
  }

  login() {
    return get('/auth/login');
  }

  me() {
    return get('/auth/me');
  }

  logout() {
    return get('/auth/logout');
  }
}

export default WebApiClient;
