export default class ModalUtil {
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
}