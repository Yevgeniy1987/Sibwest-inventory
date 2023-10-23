import { combineReducers, createStore, applyMiddleware } from "redux";
import { itemsReducer } from "./reducers/items";
import thunk from "redux-thunk";
import { historiesReducer } from "./reducers/histories";
import { locationsReducer } from "./reducers/locations";

const rootReducer = combineReducers({
   items: itemsReducer,
   histories: historiesReducer,
   locations: locationsReducer,
})

const middleware = applyMiddleware(thunk)

export const store = createStore(rootReducer, middleware)

export type State = ReturnType<typeof rootReducer>