import $api from "../http";

export class ZoneService {
  static getZones(region, city) {
    return $api.get("address/zones/", {
      params: {
        region: region,
        city: city,
      },
    });
  }

  static createCity(data) {
    return $api.post("address/city/", data);
  }

  static async addZone(data) {
    return $api.post("address/zones/", data);
  }

  static async editZone(zone) {
    return $api.put(`address/zones/${zone.id}`, zone);
  }

  static async deleteZone(id) {
    return $api.delete(`address/zones/${id}`);
  }
}
