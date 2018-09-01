import React from 'react';

export type TRecordContext = any | null;

export const {Provider, Consumer} = React.createContext<TRecordContext>(null);