import React, {Component, ReactNode} from 'react';
import './Button.scss';

interface IButtonProps {
	onClick?: () => void;
	type?: string;
	disabled?: boolean;
}

export default class Button extends Component<IButtonProps> {
	public render(): ReactNode {
		return (
			<button
				className='Button'
				onClick={this.props.onClick}
				type={this.props.type}
				disabled={this.props.disabled}
			>
				{this.props.children}
			</button>
		);
	}
}