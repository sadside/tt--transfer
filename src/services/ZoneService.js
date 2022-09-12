import $api from "../http";

export class ZoneService {
  static getZonesById(id) {
    return $api.get(`address/hub-zones/${id}/`);
  }

  static createCity(data) {
    return $api.post("address/city/", data);
  }

  static addZone(id, color, coordinates, title) {
    return $api.post(`address/hub-zones/${id}/`, {
      color,
      coordinates,
      title,
    });
  }

  static editZone(zone) {
    return $api.put(`address/edit-hub-zone/${zone.id}/`, zone);
  }

  static deleteZone(id) {
    return $api.delete(`address/edit-hub-zone/${id}/`);
  }
}
