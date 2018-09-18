import {Resource, IResource, Store} from '@library/rest/index';

/**
 * Категории трудозатрат.
 */
export default class JobCategory extends Resource<IJobCategory> {
	public static store = new Store<typeof JobCategory, JobCategory>(JobCategory);
	protected prepareRawData(rawData?: IJobCategory): IJobCategory {
		return rawData ? rawData : {
			name: '',
			hourNormCost: 0
		};
	}
}

export interface IJobCategory extends IResource {
	name: string;
	/**
	 * Стоимость нормо-часа.
	 */
	hourNormCost: number;
}