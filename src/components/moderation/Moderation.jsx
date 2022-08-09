import './moderation.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store/userSlice.ts'
import Button from '../ui/button/Button'
import clock from '../../assets/carSelected.svg'

const Moderation = () => {
	const name = useSelector(state => state.user.user.name)
	const patronymic = useSelector(state => state.user.user.patronymic)
	const dispatch = useDispatch()

	return (
		<>
			<div className='moderation-wrapper'>
				<div className='moderation-block'>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<div className='clock'>
							<img src={clock} alt='' width={64} />
						</div>
						<h1>
							{`${name} ${patronymic}`}, Ваш аккаунт проходит модерацию, спасибо за ожидание. С
							уважением, команда TT-Трансфер!
						</h1>
						<p>
							Администраторы в ближайшее время рассмотрят вашу заявку на регистрацию в роли
							менеджера.
						</p>
						<Link to='/login' style={{ textDecoration: 'none' }}>
							<Button
								text={'Вернуться на страницу входа'}
								height={50}
								width={350}
								callback={() => {
									dispatch(logout())
								}}
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Moderation
