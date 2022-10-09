import { AnimatePresence, motion } from 'framer-motion'
import Loader from '../loader/Loader'
import styles from './AddCity.module.scss'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	createIntercityCityThunk,
	getIntercityCitySuggestions,
	getIntercityRegionSuggestions,
	setIntercityCity,
	setIntercityRegion,
} from '../../store/tariffSlice'
import './addIntercityTransferSidebarContent.scss'
import Button from '../ui/button/Button'

const AddCity = () => {
	const dispatch = useAppDispatch()

	const tariffRegion = useAppSelector(state => state.tariff.intercityRegion)
	const tariffCity = useAppSelector(state => state.tariff.intercityCity)

	const [region, setRegion] = useState<string>(tariffRegion)
	const [city, setCity] = useState<string>(tariffCity)

	const regionSuggestions = useAppSelector(state => state.tariff.intercityRegionSuggestions)

	const citySuggestions = useAppSelector(state => state.tariff.intercityCitySuggestions)

	const [createConverse, setCreateConverse] = useState(false)

	const status = useAppSelector(state => state.tariff.status)

	const regionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegion(e.target.value)
		dispatch(setIntercityRegion(null))
		dispatch(getIntercityRegionSuggestions(e.target.value))
	}

	const cityInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value)
		dispatch(setIntercityCity(null))
		dispatch(getIntercityCitySuggestions(e.target.value))
	}

	useEffect(() => {
		return () => {
			dispatch(setIntercityCity(null))
			dispatch(setIntercityRegion(null))
		}
	}, [])

	return (
		<div className={'tariffs-edit-sidebar-content-wrapper'}>
			<div className='tariffs-edit-sidebar-content-wrapper-header'>
				<div className='edit-sidebar-tabs'>
					<div className={`edit-sidebar-tab active`}>Город</div>
				</div>
			</div>
			<div className='tariffs-edit-sidebar-content-wrapper-form'>
				<h2 className={styles.addCityTitle}>Создание маршрута с городом.</h2>
				<form
					className='tariffs-edit-sidebar-content-form'
					onSubmit={(e: any) => e.preventDefault()}>
					<label>
						<span className='required'>*</span>Регион
						<input
							type='text'
							className='tariff-data-input'
							value={region}
							onChange={regionInputHandler}
							placeholder={'Введите регион'}
						/>
						<AnimatePresence>
							{regionSuggestions.length > 0 && !tariffRegion && region?.length > 0 && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ type: 'Tween' }}
									style={{ zIndex: 100000000, position: 'relative' }}>
									<div className={styles.citySelect}>
										<ul>
											{regionSuggestions.map((region: any, index: number) => {
												return (
													<li
														key={index}
														onClick={() => {
															dispatch(setIntercityRegion(region))
															setRegion(region)
															setCity('')
														}}>
														{region}
													</li>
												)
											})}
										</ul>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</label>

					<label>
						<span className='required'>*</span>Город
						<input
							type='text'
							className='tariff-data-input'
							value={city}
							onChange={cityInputHandler}
							placeholder={'Введите город'}
							disabled={!tariffRegion}
						/>
						<AnimatePresence>
							{citySuggestions?.length > 0 && !tariffCity && tariffRegion && city.length > 0 && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ type: 'Tween' }}
									style={{ zIndex: 100, position: 'relative' }}>
									<div className={styles.citySelect}>
										<ul>
											{citySuggestions.map((city, index: number) => {
												return (
													<li
														key={index}
														onClick={() => {
															dispatch(setIntercityCity(city))
															setCity(city)
														}}>
														{city}
													</li>
												)
											})}
										</ul>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</label>
					<label>
						<div style={{ alignItems: 'center', display: 'flex' }}>
							<input
								type='checkbox'
								className={styles.doubleRoute}
								checked={createConverse}
								onChange={() => setCreateConverse(!createConverse)}
							/>{' '}
							Создать направление в 2 тарифах.
						</div>
					</label>
					<Button
						callback={() => {
							dispatch(
								createIntercityCityThunk({
									region: tariffRegion,
									city: tariffCity,
									converse: createConverse,
								}),
							)
						}}
						text={'Создать маршрут'}
						style={{ marginTop: 30 }}
					/>
				</form>
				{status === 'creating city' && (
					<div style={{ marginTop: 120 }}>
						<Loader />
					</div>
				)}
			</div>
		</div>
	)
}

export default AddCity
