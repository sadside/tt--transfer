import React from 'react'
import './button.scss'

interface ButtonProps {
	width?: number
	height?: number
	text?: string
	callback?: () => void
	style?: object
}

const Button: React.FC<ButtonProps> = ({ width, height, text, callback, style }) => {
	return (
		<button className={'enter-button'} onClick={callback} style={{ width, height, ...style }}>
			{text}
		</button>
	)
}

export default Button
