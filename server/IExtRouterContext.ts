import {IRouterContext} from 'koa-router';
import IExtContext from './IExtContext';

export default interface IExtRouterContext extends IRouterContext, IExtContext {}