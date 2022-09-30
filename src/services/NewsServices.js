import $api, { API_URL } from "../http";

export default class NewsServices {
  static async getNews(page) {
    return $api.get("cars/get-car-classes/");
  }

  static async createNew({ title, description, role }) {
    return $api.post("/");
  }
}
