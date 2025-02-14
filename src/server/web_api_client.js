import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const _getHeaders = () => {
  const token = localStorage.getItem('unige-connect_token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

const get = (endpoint, id) => {
  if (id) {
    return axios.get(`${REACT_APP_API_URL}${endpoint}/${id}`, {
      headers: _getHeaders(),
    });
  }
  return axios.get(REACT_APP_API_URL + endpoint, { headers: _getHeaders() });
};

const post = (endpoint, data) => {
  return axios.post(`${REACT_APP_API_URL}${endpoint}`, data, {
    headers: _getHeaders(),
  });
};

const del = (endpoint, id) => {
  if (id) {
    return axios.delete(`${REACT_APP_API_URL}${endpoint}/${id}`, {
      headers: _getHeaders(),
    });
  }
  return axios.delete(`${REACT_APP_API_URL}${endpoint}`, { headers: _getHeaders() });
};

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

  leaveGroup(groupId) {
    return put(`/groups/${groupId}/members`);
  }

  getOwnedGroups() {
    return get('/groups?owner=mine');
  }

  getMyGroups() {
    return get('/groups?member=me');
  }

  getProfessorGroups() {
    return get('/groups?teacher=me');
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

  getCourses() {
    return get('/courses');
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

  getMembers(groupId) {
    return get(`/groups/${groupId}/members`);
  }

  getProfStatistics() {
    return get('/professor/statistics');
  }
}

export default WebApiClient;
