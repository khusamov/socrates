import React, {Component, CSSProperties, ReactNode} from 'react';
import './Footer.scss';

interface IFooterProps {
	style?: CSSProperties;
}

export default class Footer extends Component<IFooterProps> {
	public render(): ReactNode {
		return (
			<div className='Footer' style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}