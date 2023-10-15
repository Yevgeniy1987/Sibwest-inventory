import { combineReducers, createStore, applyMiddleware } from "redux";
import { itemsReducer } from "./reducers/items";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
   items: itemsReducer
})

const middleware = applyMiddleware(thunk)

export const store = createStore(rootReducer, middleware)

export type State = ReturnType<typeof rootReducer>