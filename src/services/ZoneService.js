import $api from "../http";

export class ZoneService {
  static async getZones(region, city) {
    return $api.get("address/zones/", { region, city });
  }

  static async addZone() {
    return $api.post("address/zones/");
  }

  static async editZone(zone) {
    return $api.put("address/zones/id");
  }

  static async deleteZone() {
    return $api.delete("address/zones/id");
  }
}
