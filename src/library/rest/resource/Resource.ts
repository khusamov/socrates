import {IResourceModel} from '@library/rest/resource/ResourceModel';
import ResourceModel from './ResourceModel';

const {
	REACT_APP_API_HOST: API_HOST,
	REACT_APP_API_PORT: API_PORT
} = process.env;

export default class Resource {

	/**
	 * Загрузить одну запись.
	 * @param ResourceModelClass
	 * @param id
	 */
	public static async load<R extends ResourceModel>(ResourceModelClass: typeof ResourceModel, id: number): Promise<R> {
		const response = await this.fetch(id, {method: 'get'});
		return new ResourceModelClass(await response.json(), false);
	}

	/**
	 * Получить все записи.
	 */
	public static async getAll(): Promise<ResourceModel[]> {
		const response = await this.fetch({method: 'get'});
		const data = response.status === 204 ? [] : await response.json();
		return data.map((item: IResourceModel) => new this(item));
	}

	/**
	 * Удалить одну запись.
	 * @param id
	 */
	public static async delete(id: number) {
		await this.fetch(id, {method: 'delete'});
	}

	/**
	 * Создать одну запись.
	 * @param data
	 */
	private static async post(data: IResourceModel): Promise<number> {
		const response = await this.fetch({
			method: 'post',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(data)
		});
		if (response.status !== 201) {
			throw new Error(`Ошибка ${response.status} на сервере!`);
		}
		const responseData = await response.json() as IResourceModel;
		return responseData.id as number;
	}

	/**
	 * Обновить одну запись.
	 * @param id
	 * @param data
	 */
	private static async put(id: number, data: IResourceModel) {
		const response = await this.fetch(id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(data)
		});
		if (response.status !== 204) {
			throw new Error(`Ошибка ${response.status} на сервере!`);
		}
	}

	/**
	 * Отправить запрос на сервер.
	 * @param init
	 */
	private static async fetch(ResourceClass, init: RequestInit): Promise<Response>
	private static async fetch(ResourceClass, id: number, init: RequestInit): Promise<Response>
	private static async fetch(ResourceClass, idOrInit: number | RequestInit, init?: RequestInit): Promise<Response> {
		let id: number | undefined;
		if (typeof idOrInit === 'number') {
			id = idOrInit;
		} else {
			init = idOrInit;
		}
		const url = this.getApiUrl(`${ResourceClass.resourceName}${id ? `/${id}` : ''}`);
		return fetch(url, init);
	}

	/**
	 * Вычисление полного URL сервиса.
	 * @param {string} path
	 * @returns {string}
	 */
	private static getApiUrl(path: string): string {
		const serverAddress: string = [API_HOST, API_PORT].filter(s => s).join(':');
		return (
			serverAddress
				? `http://${serverAddress}/${path}`
				: `/${path}`
		);
	}

}