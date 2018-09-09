import React, {Component, ReactNode, Children, ReactElement, Key, CSSProperties} from 'react';
import './Tabs.scss';
import Tab, {ITabProps} from './Tab';
import TabButton from './TabButton';
export {default as Tab} from './Tab';

function isReactElement(child: any): child is ReactElement<{}>  {
	return 'type' in child && 'props' in child && 'key' in child;
}

interface ITabsProps {
	activeTabKey?: Key;
	bodyStyle?: CSSProperties;
}

interface ITabsState {
	activeTabKey: Key;
}

export default class Tabs extends Component<ITabsProps, ITabsState> {

	public state: ITabsState = {
		activeTabKey: 0
	};

	public render(): ReactNode {
		return (
			<div className='TabPabel'>
				<div className='tab-buttons'>{this.renderTabButtons()}</div>
				<div className='tab-contents' style={this.props.bodyStyle}>{this.getActiveTabContent()}</div>
			</div>
		);
	}

	private getActiveTabContent() {
		return Children.map(this.props.children, (child: ReactElement<ITabProps>, index) => {
			return (child.key || index) === this.state.activeTabKey ? child : null;
		});
	}

	private renderTabButtons(): ReactNode[] {
		return Children.map(this.props.children, (child, index) => {
			if (isReactElement(child)) {
				if (child.type === Tab) {
					const tabProps: ITabProps = child.props as ITabProps;
					const tabKey: Key = child.key || index;
					return (
						<TabButton
							key={tabKey}
							tabKey={tabKey}
							checked={tabKey === this.state.activeTabKey}
							children={tabProps.title}
							onClick={this.onTabButtonClick}
						/>
					);
				} else {
					throw new Error('Допускаются только элементы <Tab>.');
				}
			} else {
				throw new Error('Допускаются только элементы в качестве дочерних элементов.');
			}
		});
	}

	private onTabButtonClick = (tabKey: Key) => {
		this.setState({
			activeTabKey: tabKey
		})
	};

}