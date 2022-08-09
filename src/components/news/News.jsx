import './news.scss'
import axios from 'axios'
import $api, { API_URL } from '../../http'
import Post from '../post/Post'
import TextArea from '../textArea/TextArea'
import Button from '../ui/button/Button'
import TsComponent from '../tsComponent/TsComponent'

const News = () => {
	const getUsers = () => {
		const response = $api.get('auth/user-list/')
		console.log(response)
	}

	return (
		<div className='news-wrapper'>
			<TextArea />
			<Button
				text='Отправить'
				height={40}
				width={160}
				style={{ fontWeight: 300, marginTop: 22, fontSize: 14 }}
			/>
			<TsComponent height={100} width={150}>
				<div>hello</div>
			</TsComponent>
			<Post />
			<button onClick={getUsers}>Сделать запрос на получение пользователей</button>
			<Post />
			<Post />
			<Post />
		</div>
	)
}

export default News
