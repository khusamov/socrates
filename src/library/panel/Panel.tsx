import React, {Component, ReactNode} from 'react';
import './Panel.scss';
import classnames from 'classnames';
export {default as Title} from './Title';
export {default as Content} from './Content';
export {default as Footer} from './Footer';
export {default as Docked} from './Docked';
export {default as Header} from './Header';

interface IPanelProps {
	framed?: boolean;
}

export default class Panel extends Component<IPanelProps> {
	public render(): ReactNode {
		const className = classnames('Panel', {
			framed: this.props.framed
		});
		return (
			<div className={className}>
				{this.props.children}
			</div>
		);
	}
}