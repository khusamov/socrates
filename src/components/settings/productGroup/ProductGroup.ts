import {Resource, IResource, Store} from '@library/rest/index';

/**
 * Группы товаров/услуг.
 */
export default class ProductGroup extends Resource<IProductGroup> {
	public static store = new Store<typeof ProductGroup, ProductGroup>(ProductGroup);
	protected prepareRawData(rawData?: IProductGroup): IProductGroup {
		return rawData ? rawData : {
			name: ''
		};
	}
}

export interface IProductGroup extends IResource {
	name: string;
}