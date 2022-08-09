import './addCar.scss'
import EditSidebarSubmitButtons from '../editSidebarSubmitButtons/EditSidebarSubmitButtons'
import SidebarHeader from '../sidebarHeader/SidebarHeader'
import pts from '../../assets/pts.svg'

const AddCar = ({ handlePhotoClick }) => {
	return (
		<>
			<SidebarHeader title='Добавить машину' />
			<div className='add-car-wrap'>
				<div className='add-car-fields'>
					<div className='add-car-photo'>
						<div className='car-photo-wrap'>Загрузите фото</div>
					</div>
					<div className='add-car-info'>
						<label>
							<span className='required'>*</span>Марка
							<input
								type='text'
								className='tariff-data-input car-input'
								placeholder='Введите марку автомобиля'
							/>
						</label>
						<label>
							<span className='required'>*</span>Модель
							<input
								type='text'
								className='tariff-data-input car-input'
								placeholder='Введите модель автомобиля'
							/>
						</label>
						<label>
							<span className='required'>*</span>Мощность
							<input
								type='text'
								className='tariff-data-input car-input'
								placeholder='Введите мощность автомобиля'
							/>
						</label>
						<label>
							<span className='required'>*</span>Объем двигателя
							<input
								type='text'
								className='tariff-data-input car-input'
								placeholder='Введите объем двигателя'
							/>
						</label>
						<label>
							<span className='required'>*</span>Цвет кузова
							<input
								type='text'
								className='tariff-data-input car-input'
								placeholder='Введите цвет кузова'
							/>
						</label>
						<label>
							<span className='required'>*</span>Комплектация
							<input
								type='text'
								className='tariff-data-input car-input'
								placeholder='Введите комплектацию'
							/>
						</label>
						<label>
							<span className='required'>*</span>ПТС
							<input
								type='text'
								className='tariff-data-input car-input'
								placeholder='Введите ПТС автомобиля'
							/>
						</label>
						<label>
							<span className='required'>*</span>НОМЕР СТС
							<input
								type='text'
								className='tariff-data-input car-input'
								placeholder='Введите номер СТС автомобиля'
							/>
						</label>
					</div>
				</div>
				<div className='upload-car-documents-title-wrap'>
					<div className='upload-car-documents-title'>Загрузить документы:</div>
					<div className='upload-car-documents-title'>Загруженные документы:</div>
				</div>
				<div className='upload-car-documents-wrap'>
					<div className='upload-car-documents'>Загрузить...</div>
					<div className='uploaded-car-documents'>
						<img src={pts} alt='' onClick={handlePhotoClick} />
						<img src={pts} alt='' onClick={handlePhotoClick} />
					</div>
				</div>
			</div>
			<div className='submit-buttons-wrap'>
				<EditSidebarSubmitButtons firstTitle='Сбросить' secondTitle='Сохранить' />
			</div>
		</>
	)
}

export default AddCar
