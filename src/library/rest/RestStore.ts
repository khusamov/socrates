import RestProxy, {IRestRecord} from './RestProxy';
import ResourceModel from './resource/ResourceModel';
import _ from 'lodash';

// export default class RestStore<S extends ResourceModel<U>, U extends IRestRecord = U, T extends typeof ResourceModel = typeof ResourceModel> {
//
// 	public proxy: RestProxy<U>;
//
// 	private readonly ResourceModelClass: T;
//
// 	constructor(ResourceModelClass: T) {
// 		this.ResourceModelClass = ResourceModelClass;
// 		this.proxy = new RestProxy<U>((this.constructor as T).resourceName);
// 	}
//
// 	public async getAll(): Promise<S[]> {
// 		return (await this.proxy.getAll()).map(rawData => new this.ResourceModelClass(rawData) as S);
// 	}
//
// }

interface IResourceModelConstructor {
	/**
	 * Пока пришлось это статического свойство класса ResourceModel здесь дублировать.
	 * @link https://goo.gl/wt4D5Y
	 * Смотрите параграф 'Разница между статической частью и экземпляром класса'
	 */
	resourceName: string;

	new(...args: any[]): ResourceModel<IRestRecord>;
}

export default class RestStore<
	TResourceModelConstructor extends IResourceModelConstructor,
	TResourceModel extends ResourceModel<IRestRecord>,
	> {

	public proxy: RestProxy<IRestRecord>;

	private readonly ResourceModelClass: TResourceModelConstructor;

	constructor(ResourceModelClass: TResourceModelConstructor) {
		this.ResourceModelClass = ResourceModelClass;
		this.proxy = new RestProxy<IRestRecord>((ResourceModelClass as typeof ResourceModel).resourceName);
	}

	public async getAll(): Promise<TResourceModel[]> {
		return (await this.proxy.getAll()).map(rawData => new this.ResourceModelClass(rawData) as TResourceModel);
	}

	public async getOne(id: number): Promise<TResourceModel> {
		return new this.ResourceModelClass(await this.proxy.getOne(id)) as TResourceModel;
	}

	public async delete(id: number): Promise<void> {
		await this.proxy.delete(id);
	}

	public clone(resourceModel: TResourceModel): TResourceModel {
		return new this.ResourceModelClass(_.cloneDeep(resourceModel.rawData)) as TResourceModel;
	}

}