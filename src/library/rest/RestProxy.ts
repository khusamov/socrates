const {
	REACT_APP_API_HOST: API_HOST,
	REACT_APP_API_PORT: API_PORT
} = process.env;

export interface IRestRecord {
	id?: number;
}

export default class RestProxy<D extends IRestRecord> {

	/**
	 * Отправить запрос на сервер.
	 * @param resourceName
	 * @param init
	 */
	private static async fetch(resourceName: string, init: RequestInit): Promise<Response>
	private static async fetch(resourceName: string, id: number, init: RequestInit): Promise<Response>
	private static async fetch(resourceName: string, idOrInit: number | RequestInit, init?: RequestInit): Promise<Response> {
		let id: number | undefined;
		if (typeof idOrInit === 'number') {
			id = idOrInit;
		} else {
			init = idOrInit;
		}
		const url = this.getApiUrl(`${resourceName}${id ? `/${id}` : ''}`);
		return fetch(url, init);
	}

	/**
	 * Вычисление полного URL сервиса.
	 * @param {string} resourceName
	 * @returns {string}
	 */
	private static getApiUrl(resourceName: string): string {
		const serverAddress: string = [API_HOST, API_PORT].filter(s => s).join(':');
		return (
			serverAddress
				? `http://${serverAddress}/${resourceName}`
				: `/${resourceName}`
		);
	}

	/**
	 * Конструктор REST-прокси.
	 * @param resourceName Имя ресурса.
	 */
	constructor(public resourceName: string) {}

	/**
	 * Загрузить одну запись.
	 * @param id
	 */
	public async getOne(id: number): Promise<D> {
		const response = await RestProxy.fetch(this.resourceName, id, {method: 'get'});
		return await response.json();
	}

	/**
	 * Получить все записи.
	 */
	public async getAll(): Promise<D[]> {
		const response = await RestProxy.fetch(this.resourceName, {method: 'get'});
		return response.status === 204 ? [] : await response.json();
	}

	/**
	 * Создать одну запись.
	 * @param data
	 * @returns id
	 */
	public async post(data: D): Promise<number> {
		const response = await RestProxy.fetch(this.resourceName, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(data)
		});
		if (!response.ok) {
			throw new Error(`Ошибка ${response.status} на сервере!`);
		}
		const responseData = await response.json() as D;
		return responseData.id as number;
	}

	/**
	 * Обновить одну запись.
	 * @param id
	 * @param data
	 */
	public async put(id: number, data: D): Promise<void> {
		const response = await RestProxy.fetch(this.resourceName, id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(data)
		});
		if (!response.ok) {
			throw new Error(`Ошибка ${response.status} на сервере!`);
		}
	}

	/**
	 * Удалить одну запись.
	 * @param id
	 */
	public async delete(id: number): Promise<void> {
		const response = await RestProxy.fetch(this.resourceName, id, {method: 'delete'});
		if (!response.ok) {
			throw new Error(`Ошибка ${response.status} на сервере!`);
		}
	}

}