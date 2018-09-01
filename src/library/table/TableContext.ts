import React from 'react';

export interface ITableContext<D> {
	data: D[];
}

export const {Provider, Consumer} = React.createContext<ITableContext<any>>({
	data: []
});