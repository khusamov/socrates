import React, {Component, Key, ReactNode} from 'react';
import './TabButton.scss';
import classnames from 'classnames';

export interface ITabButtonProps {
	tabKey: Key;
	checked: boolean;
	onClick: (tabKey: Key) => void
}

export default class TabButton extends Component<ITabButtonProps> {

	public render(): ReactNode {
		const className = classnames('TabButton', {
			checked: this.props.checked
		});
		return (
			<button className={className} onClick={this.onClick}>
				{this.props.children}
			</button>
		);
	}

	private onClick = () => {
		this.props.onClick(this.props.tabKey)
	};

}