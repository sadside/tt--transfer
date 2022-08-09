import axios from 'axios'

export default class CalculatorService {
	static async getCities() {
		return axios.get('https://api.hh.ru/areas')
	}
}
