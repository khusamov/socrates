import React, {Component, Fragment, KeyboardEvent, MouseEvent, RefObject} from 'react';
import './Modal.css';

interface IModalProps {
	visible: boolean;
}

interface IModalState {
	visible: boolean;
}

export default class Modal extends Component<IModalProps, IModalState> {
	public static defaultProps: IModalProps = {
		visible: false
	};

	/**
	 * Узнать ширину полосы прокрутки.
	 * Возвращает ширину стандартной полосы прокрутки. Именно самой полосы,
	 * где ползунок. Обычно она равна 16px, в редких и мобильных браузерах
	 * может колебаться от 14px до 18px, а кое-где даже равна 0px.
	 * Код работает на любом HTML-документе, независимо от его содержимого.
	 * @link https://learn.javascript.ru/task/scrollbar-width
	 * @link https://bootstrap-4.ru/docs/4.1/components/modal/
	 */
	public static getScrollWidth(): number {
		// создадим элемент с прокруткой
		const div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';

		// при display:none размеры нельзя узнать
		// нужно, чтобы элемент был видим,
		// visibility:hidden - можно, т.к. сохраняет геометрию
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		const scrollWidth = div.offsetWidth - div.clientWidth;
		document.body.removeChild(div);

		return scrollWidth;
	}

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
						<div className='window' tabIndex={1} ref={this.modalRef} onClick={this.stopPropagation}>
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