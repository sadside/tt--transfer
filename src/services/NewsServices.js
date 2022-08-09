import $api, { API_URL } from '../http'

export default class NewsServices {
	static async getNews(page) {
		return $api.get('/')
	}

	static async postNews(page) {
		return $api.post('/')
	}
}
