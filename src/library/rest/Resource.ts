import camelcase from 'camelcase';
import Proxy from './Proxy';
import IResource from './IResource';

export default class Resource<T extends IResource> {

	/**
	 * Имя ресурса.
	 */
	public static get resourceName(): string {
		return camelcase(this.name);
	}

	/**
	 * Фантомные объекты (phantom === true) не имеют соответствующей записи
	 * на сервере и не имеют своего ID.
	 */
	public phantom: boolean;

	/**
	 * Посредник для связи с REST-сервером.
	 */
	private readonly proxy: Proxy<T>;

	/**
	 * Конструктор объекта ресурса.
	 * @param rawData = {}
	 */
	constructor(public rawData: T = {} as T) {
		this.phantom = !('id' in rawData);
		this.proxy = new Proxy<T>((this.constructor as typeof Resource).resourceName);
	}

	/**
	 * Сохранить запись на сервере.
	 */
	public async save() {
		if (this.phantom) {
			this.rawData.id = await this.proxy.post(this.rawData);
			this.phantom = false;
		} else {
			await this.proxy.put(this.rawData.id as number, this.rawData);
		}
	}

}