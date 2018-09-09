import {Resource, IResource, Store} from '@library/rest/index';

export default class ProductGroup extends Resource<IProductGroup> {
	public static store = new Store<typeof ProductGroup, ProductGroup>(ProductGroup);
}

export interface IProductGroup extends IResource {
	name: string;
}