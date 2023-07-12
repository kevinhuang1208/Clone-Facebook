import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import PostsReducer from './posts';
import postCommentsReducer from './comments';
import MessagesReducer from './messages';
import usersReducer from './users';

const rootReducer = combineReducers({
  session,
  posts: PostsReducer,
  comments: postCommentsReducer,
  users: usersReducer,
  messages: MessagesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
