import http from "../api/http-common";

function getAll(path: string, reqParams: {}) {
  return http.get(path, { params: reqParams });
}

function getById(id: string | number, path: string, reqParams: {}) {
  return http.get(`${path}/${id}`, { params: reqParams });
}

const ApiService = {
  getAll,
  getById,
};

export default ApiService;
