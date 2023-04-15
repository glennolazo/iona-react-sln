import ApiService from "./ApiService";

function getCats(path: string, reqParams: {}) {
  return ApiService.getAll(path, { params: reqParams });
}

function getCat(id: number | string, path: string, reqParams: {}) {
  return ApiService.getById(id, path, { params: reqParams });
}

function getBreeds(path: string, reqParams: {}) {
  return ApiService.getAll(path, { params: reqParams });
}

const CatService = {
  getCats,
  getCat,
  getBreeds
};

export default CatService;
