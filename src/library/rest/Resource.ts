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
	public get phantom(): boolean {
		return !('id' in this.rawData);
	}

	public rawData: T;

	/**
	 * Посредник для связи с REST-сервером.
	 */
	private readonly proxy: Proxy<T>;

	/**
	 * Конструктор объекта ресурса.
	 */
	constructor(rawData?: T) {
		this.proxy = new Proxy<T>((this.constructor as typeof Resource).resourceName);
		this.rawData = this.prepareRawData(rawData);
	}

	/**
	 * Сохранить (создать новую или обновить имеющуюся) запись на сервере.
	 */
	public async save() {
		if (this.phantom) {
			this.rawData.id = await this.proxy.post(this.rawData);
		} else {
			await this.proxy.put(this.rawData.id as number, this.rawData);
		}
	}

	/**
	 * Приведение rawData в соответствие с интерфейсом IResource.
	 * В простейшем случае, если rawData не задан, то заполнение значениями по умолчанию.
	 * @param rawData
	 */
	protected prepareRawData(rawData?: T): T {
		return rawData ? rawData : {} as T;
	}

}