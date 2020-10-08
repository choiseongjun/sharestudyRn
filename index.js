import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer, { rootSaga } from './src/modules';

const persistConfig = {
  key: 'root',
  storage
};
const sagaMiddleware = createSagaMiddleware();
const enhancedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  enhancedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Root);
