import React from 'react';

export type TColumnRenderMode = 'thead' | 'tbody';

export interface IColumnContext {
	renderMode?: TColumnRenderMode;
}

export const {Provider, Consumer} = React.createContext<IColumnContext>({});