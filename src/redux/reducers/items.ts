import { ItemType } from "../../context/GlobalContext"
import { ItemsAction, SET_ITEMS, UPDATE_ITEM } from "../actions/items"

const initialState: ItemType[] = []

export const itemsReducer = (state = initialState, action: ItemsAction) => {
    switch (action.type) {
        case SET_ITEMS:{
            return action.payload
        }
        case UPDATE_ITEM: {
            const updateItem = action.payload as ItemType
            const updateItemIdx = state.findIndex(item => item.id === updateItem.id)
            const newState = [...state]
            newState[updateItemIdx] = updateItem
            
            return newState
        }
        default: {
            return state
        }
    }
}