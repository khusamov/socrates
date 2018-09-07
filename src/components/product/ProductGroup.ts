import ResourceModel from '@library/rest/resource/ResourceModel';
// import RestProxy from '@library/rest/RestProxy';
import IProductGroup from './IProductGroup';
import RestStore from '@library/rest/RestStore';

export default class ProductGroup extends ResourceModel<IProductGroup> {

	public static get store() {
		return new RestStore<typeof ProductGroup, ProductGroup>(this);
	}

	// public static async getAll(): Promise<ProductGroup[]> {
	// 	return (await this.restProxy.getAll()).map(rawData => new ProductGroup(rawData));
	// }
	//
	// public static async getOne(id: number): Promise<ProductGroup> {
	// 	return new ProductGroup(await this.restProxy.getOne(id));
	// }
	//
	// public static async delete(id: number): Promise<void> {
	// 	await this.restProxy.delete(id);
	// }
	//
	// private static _restProxy: RestProxy<IProductGroup>;
	//
	// private static get restProxy(): RestProxy<IProductGroup> {
	// 	if (!this._restProxy) {
	// 		this._restProxy = new RestProxy<IProductGroup>(this.resourceName);
	// 	}
	// 	return this._restProxy;
	// }
	//
	// public clone(): ProductGroup {
	// 	return super.clone() as ProductGroup;
	// }

}

