import camelcase from 'camelcase';
import RestProxy, {IRestRecord} from '../RestProxy';
// import RestStore from '@library/rest/RestStore';

export default class ResourceModel<T extends IRestRecord> {

	// public static get store(): RestStore<typeof ResourceModel, ResourceModel<IRestRecord>> {
	// 	return new RestStore<typeof ResourceModel, ResourceModel<IRestRecord>>(this);
	// }

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

	private readonly proxy: RestProxy<T>;

	/**
	 * Конструктор объекта ресурса.
	 * @param rawData = {}
	 */
	constructor(public rawData: T = {} as T) {
		this.phantom = !('id' in rawData);
		this.proxy = new RestProxy<T>((this.constructor as typeof ResourceModel).resourceName);
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