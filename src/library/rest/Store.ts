import _ from 'lodash';
import Proxy from './Proxy';
import IResource from './IResource';
import Resource from './Resource';

interface IResourceModelConstructor {
	/**
	 * Пока не найден другой выход, то здесь приходится дублировать статическое
	 * свойство ResourceModel.resourceName. Почему так, смотрите по ссылке
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
	TResourceModelConstructor extends IResourceModelConstructor,
	TResourceModel extends Resource<IResource>,
	> {

	public proxy: Proxy<IResource>;

	private readonly ResourceModelClass: TResourceModelConstructor;

	/**
	 * Конструктор посредника.
	 * @param ResourceModelClass Ссылка на класс ресурса. Требуется для получения имени ресурса
	 * и для создания экземпляров ресурсов.
	 */
	constructor(ResourceModelClass: TResourceModelConstructor) {
		this.ResourceModelClass = ResourceModelClass;
		this.proxy = new Proxy<IResource>((ResourceModelClass as typeof Resource).resourceName);
	}

	/**
	 * Получить все записи данного ресурса с сервера.
	 */
	public async getAll(): Promise<TResourceModel[]> {
		return (await this.proxy.getAll()).map(rawData => new this.ResourceModelClass(rawData) as TResourceModel);
	}

	/**
	 * Получить одну запись с сервера.
	 * @param id
	 */
	public async getOne(id: number): Promise<TResourceModel> {
		return new this.ResourceModelClass(await this.proxy.getOne(id)) as TResourceModel;
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
	public clone(resourceModel: TResourceModel): TResourceModel {
		return new this.ResourceModelClass(_.cloneDeep(resourceModel.rawData)) as TResourceModel;
	}

}