import {BaseContext} from 'koa';
import {Database} from "sqlite";

export default interface IExtContext extends BaseContext {
	db: Database;
}