import { initData } from "./initData"
import { actionTypes } from "./actionTypes"

export function modelReducer(dataStore, action) {
    switch (action.type) {
        case actionTypes.ADD:
            return {
                ...dataStore,
                [action.dataType]: [...dataStore[action.dataType], action.payload]
            }
        case actionTypes.DELETE:
            return {
                ...dataStore,
                [action.dataType]: dataStore[action.dataType].filter(item => item.id !== action.payload)
            }

        case actionTypes.SORTE:
            return {
                ...dataStore,
                [action.dataType]: [...dataStore[action.dataType].filter(item => !item.checked), ...dataStore[action.dataType].filter(item => item.checked)]
            }

        case actionTypes.CHECK:
            return {
                ...dataStore,
                [action.dataType]: [...dataStore[action.dataType].map(item => {
                    if (item.id === action.payload)
                        item.checked = !item.checked

                    return item
                })]
            }

        default:
            return dataStore || initData
    }
} 