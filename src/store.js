import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from '../rootReducer'

const Middlewares = [
    thunkMiddleware,
    createLogger()
]

export default function configStore(){
    const store = createStore(rootReducer,applyMiddleware(Middlewares))
    return store
}
