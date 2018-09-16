import {Resource, IResource, Store} from '@library/rest/index';

/**
 * Категории трудозатрат.
 */
export default class JobCategory extends Resource<IJobCategory> {
	public static store = new Store<typeof JobCategory, JobCategory>(JobCategory);
}

export interface IJobCategory extends IResource {
	name: string;
	/**
	 * Стоимость нормо-часа.
	 */
	hourNormCost: number;
}