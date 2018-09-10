import React, {Component, ReactNode, Fragment, ChangeEvent} from 'react';
import uuidv1 from 'uuid/v1';

interface ITextFieldProps {
	label: string;
	value: string;
	name: string;

	// TODO Сделать передачу в обработчик onChange не события, а измененное значение.
	// В компоненте Form, соответственно, изменить метод onFieldChange.
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;

}

export default class TextField extends Component<ITextFieldProps> {

	public render(): ReactNode {
		const fieldId = uuidv1();
		return (
			<Fragment>
				<label htmlFor={fieldId}>{this.props.label}:</label>
				<input
					id={fieldId}
					type='text'
					name={this.props.name}
					value={this.props.value}
					onChange={this.props.onChange}
				/>
			</Fragment>
		);
	}

}