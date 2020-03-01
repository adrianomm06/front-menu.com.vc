import http from "../http-common";

class PedidoDataService {
  getAll() {
    return http.get("/pedidos");
  }

  get(id) {
    return http.get(`/pedidos/${id}`);
  }

  create(data) {
    return http.post("/pedidos", data);    
  }

  update(id, data) {
    return http.put(`/pedidos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/pedidos/${id}`);
  }
}

export default new PedidoDataService();