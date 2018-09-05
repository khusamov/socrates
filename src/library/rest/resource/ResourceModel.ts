import camelcase from 'camelcase';
// import Resource from './Resource';

export interface IResourceModel {
	id?: number;
}

export default class ResourceModel<T extends IResourceModel = IResourceModel> {

	/**
	 * Имя ресурса.
	 */
	public static get resourceName(): string {
		return camelcase(this.name);
	}

	/**
	 * Конструктор объекта ресурса.
	 * @param data
	 * @param phantom Фантомные объекты (phantom === true) не имеют соответствующей записи на сервере и не имеют своего ID.
	 */
	constructor(public data: T, public phantom: boolean = true) {}

	/**
	 * Сохранить запись на сервере.
	 */
	public async save() {
		// if (this.phantom) {
		// 	this.data.id = await Resource.post(this.data);
		// 	this.phantom = false;
		// } else {
		// 	await Resource.put(this.data.id as number, this.data);
		// }
	}

	public clone<C extends ResourceModel = ResourceModel>(): C {
		return new (this.constructor as {new(data: T): C})(this.data);
	}

}