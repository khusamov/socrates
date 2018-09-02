import React, {Component, CSSProperties, Fragment, KeyboardEvent, MouseEvent, RefObject} from 'react';
import './Modal.scss';

interface IModalProps {
	visible: boolean;
	windowStyle?: CSSProperties;
}

interface IModalState {
	visible: boolean;
}

export default class Modal extends Component<IModalProps, IModalState> {

	public static defaultProps: IModalProps = {
		visible: false
	};

	public state: IModalState = {
		visible: false
	};

	private modalRef: RefObject<HTMLDivElement>;

	constructor(props: IModalProps) {
		super(props);
		this.state.visible = this.props.visible;
		this.modalRef = React.createRef<HTMLDivElement>();
	}

	public componentWillReceiveProps(nextProps: Readonly<IModalProps>) {
		this.setState({
			visible: nextProps.visible
		});
	}

	public componentDidUpdate() {
		if (this.modalRef.current) {
			this.modalRef.current.focus();
		}
	}

	public render() {
		return (
			this.state.visible && (
				<Fragment>
					<div className='Modal' onClick={this.onOuterClick} onKeyDown={this.onKeyDown}>
						<div
							className='window'
							tabIndex={1}
							ref={this.modalRef}
							onClick={this.stopPropagation}
							style={this.props.windowStyle}
						>
							{this.props.children}
						</div>
					</div>
					<div className='ModalShadow' />
				</Fragment>
			)
		);
	}

	private onKeyDown = (event: KeyboardEvent) => {
		if (event.keyCode === 27) { // Клавиша ESC.
			this.setState({
				visible: false
			});
		}
	};

	private onOuterClick = (event: MouseEvent) => {
		this.setState({
			visible: false
		});
	};

	private stopPropagation = (event: MouseEvent) => {
		event.stopPropagation();
	};

}