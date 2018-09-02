import React, {Component, ReactNode} from 'react';
import './Panel.scss';
export {default as Title} from './Title';
export {default as Content} from './Content';
export {default as Footer} from './Footer';
export {default as Docked} from './Docked';

export default class Panel extends Component {
	public render(): ReactNode {
		return (
			<div className='Panel'>
				{this.props.children}
			</div>
		);
	}
}