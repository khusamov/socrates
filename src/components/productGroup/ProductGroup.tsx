import * as React from 'react';

interface IProductGroupState {
	productGroupList: any[]
}

export default class ProductGroup extends React.Component<{}, IProductGroupState> {
	public state: IProductGroupState = {
		productGroupList: []
	};
	public async componentDidMount() {

		const response = await fetch('http://localhost:8081/ProductGroup', {
			method: 'get'
		});

		const data = await response.json();

		this.setState({
			productGroupList: data
		});
	}
	public render() {
		return (
			<div className='ProductGroup'>
				{this.state.productGroupList.map((productGroupItem, index) => <div key={index}>{productGroupItem.Name}</div>)}
			</div>
		);
	}
}