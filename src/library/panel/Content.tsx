import React, {Component, CSSProperties, ReactNode} from 'react';
import './Content.scss';

interface IContentProps {
	style?: CSSProperties;
}

export default class Content extends Component<IContentProps> {
	public render(): ReactNode {
		return (
			<div className='Body' style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}