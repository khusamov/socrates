// import ResourceModel, {TResourceModelClass, IResourceModel} from './ResourceModel';
// import RestProxy, {IRestRecord} from '../RestProxy';
// import ProductGroup from '../../../components/product/ProductGroup';
// import IProductGroup from '../../../components/product/IProductGroup';
//
// export default class Resource<RM extends ResourceModel<IResourceModel>> {
//
// 	public async getAll(): Promise<RM[]> {
// 		return (await this.restProxy.getAll()).map(rawData => new ProductGroup(rawData));
// 	}
//
// 	public async getOne(id: number): Promise<RM> {
// 		return new ProductGroup(await this.restProxy.getOne(id));
// 	}
//
// 	public async delete(id: number): Promise<void> {
// 		await this.restProxy.delete(id);
// 	}
//
// 	private _restProxy: RestProxy<IProductGroup>;
//
// 	private get restProxy(): RestProxy<IProductGroup> {
// 		if (!this._restProxy) {
// 			this._restProxy = new RestProxy<IProductGroup>(this.resourceName);
// 		}
// 		return this._restProxy;
// 	}
//
// }