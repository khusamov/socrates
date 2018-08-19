import * as React from 'react';

interface IProductGroupState {
	productGroupList: any[]
}

export default class ProductGroup extends React.Component<{}, IProductGroupState> {
	state: IProductGroupState = {
		productGroupList = []
	};
	public componentDidMount() {
		this.setState({
			productGroupList: [{
				Name: 'dsdffsd'
			}]
		});
	}
	public render() {
		return (
			<div className='ProductGroup'>
				{this.productGroupList.map(productGroupItem => <div>{productGroupItem.Name}</div>)}
			</div>
		);
	}
}