import _ from 'lodash';
import Proxy from './Proxy';
import IResource from './IResource';
import Resource from './Resource';

export interface IResourceConstructor {
	/**
	 * Пока не найден другой выход, то здесь приходится дублировать статическое
	 * свойство Resource.resourceName. Почему так, смотрите по ссылке
	 * параграф 'Разница между статической частью и экземпляром класса':
	 * @link https://goo.gl/wt4D5Y
	 */
	resourceName: string;

	new(...args: any[]): Resource<IResource>;
}

/**
 * Посредник для связи сервером для конкретного ресурса.
 */
export default class Store<
	TResourceConstructor extends IResourceConstructor,
	TResource extends Resource<IResource>,
	> {

	public proxy: Proxy<IResource>;

	private readonly ResourceClass: TResourceConstructor;

	/**
	 * Конструктор посредника.
	 * @param ResourceClass Ссылка на класс ресурса. Требуется для получения имени ресурса
	 * и для создания экземпляров ресурсов.
	 */
	constructor(ResourceClass: TResourceConstructor) {
		this.ResourceClass = ResourceClass;
		this.proxy = new Proxy<IResource>((ResourceClass as typeof Resource).resourceName);
	}

	/**
	 * Получить все записи данного ресурса с сервера.
	 */
	public async getAll(): Promise<TResource[]> {
		return (await this.proxy.getAll()).map(rawData => new this.ResourceClass(rawData) as TResource);
	}

	/**
	 * Получить одну запись с сервера.
	 * @param id
	 */
	public async getOne(id: number): Promise<TResource> {
		return new this.ResourceClass(await this.proxy.getOne(id)) as TResource;
	}

	/**
	 * Удалить запись.
	 * @param id
	 */
	public async delete(id: number): Promise<void> {
		await this.proxy.delete(id);
	}

	/**
	 * Сделать клон записи в памяти.
	 * Клонирование данных производится функцией _.cloneDeep().
	 * @param resourceModel
	 */
	public clone(resourceModel: TResource): TResource {
		return new this.ResourceClass(_.cloneDeep(resourceModel.rawData)) as TResource;
	}

}