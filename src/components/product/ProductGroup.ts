const {
	REACT_APP_API_HOST: API_HOST,
	REACT_APP_API_PORT: API_PORT
} = process.env;

export interface IProductGroup {
	id?: number;
	name: string;
}

export default class ProductGroup {

	/**
	 * Загрузить одну запись.
	 * @param id
	 */
	public static async load(id: number): Promise<ProductGroup> {
		const response = await this.fetch(id, {method: 'get'});
		const data = (await response.json()) as IProductGroup;
		return new ProductGroup(data);
	}

	/**
	 * Получить все записи.
	 */
	public static async getAll(): Promise<ProductGroup[]> {
		const response = await this.fetch({method: 'get'});
		const data = response.status === 204 ? [] : await response.json();
		return data.map((item: IProductGroup) => new ProductGroup(item));
	}

	/**
	 * Удалить одну запись.
	 * @param id
	 */
	public static async delete(id: number) {
		const response = await this.fetch(id, {method: 'delete'});
		console.log(response);
	}

	/**
	 * Создать одну запись.
	 * @param data
	 */
	private static async post(data: IProductGroup): Promise<number> {
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
		const responseData = await response.json() as IProductGroup;
		return responseData.id as number;
	}

	/**
	 * Обновить одну запись.
	 * @param id
	 * @param data
	 */
	private static async put(id: number, data: IProductGroup) {
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
	private static async fetch(init: RequestInit): Promise<Response>
	private static async fetch(id: number, init: RequestInit): Promise<Response>
	private static async fetch(idOrInit: number | RequestInit, init?: RequestInit): Promise<Response> {
		let id: number | undefined;
		if (typeof idOrInit === 'number') {
			id = idOrInit;
		} else {
			init = idOrInit;
		}
		const url = this.getApiUrl(`productGroup${id ? `/${id}` : ''}`);
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

	/**
	 * Если phantom === true, то объект не имеет соответствующей записи на сервере.
	 */
	public phantom: boolean = true;

	/**
	 * Конструктор объекта для записи о группе товаров/услуг.
	 * @param data
	 */
	constructor(public data: IProductGroup) {}

	/**
	 * Сохранить запись на сервере.
	 */
	public async save() {
		if (this.phantom) {
			this.data.id = await ProductGroup.post(this.data);
			this.phantom = false;
		} else {
			await ProductGroup.put(this.data.id as number, this.data);
		}
	}

	public clone(): ProductGroup {
		return new ProductGroup(this.data);
	}

}