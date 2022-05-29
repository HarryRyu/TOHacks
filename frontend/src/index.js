import 'webrtc-adapter';
 import { InMemoryCache } from 'apollo-cache-inmemory';
 import { ApolloClient } from 'apollo-client';
 import { split } from 'apollo-client-preset';
 import { HttpLink } from 'apollo-link-http';
 import { WebSocketLink } from 'apollo-link-ws';
 import { getMainDefinition } from 'apollo-utilities';
 import React from 'react';
 import { ApolloProvider } from 'react-apollo';
 import ReactDOM from 'react-dom';
 import { Provider } from 'react-redux';
 import { renderRoutes } from 'react-router-config';
 import { BrowserRouter } from 'react-router-dom';
 import './styles/index.scss';
 import routes from './routes';
 import store from './store';
 import { setToken } from './actions/token';
 store.dispatch(setToken(window.__JWT_TOKEN__));

 const httpLink = new HttpLink({
   uri: process.env.GRAPHQL_URI,
   credentials: 'same-origin',
 });

 const wsLink = new WebSocketLink({
   uri: process.env.GRAPHQL_WS_URI,
   options: {
     reconnect: true,
   },
 });

 const subscriptionMiddleware = {
   applyMiddleware(options, next) {
     const { token } = store.getState();
     options.connectionParams = { authToken: token };
     next();
   },
 };

 wsLink.subscriptionClient.use([subscriptionMiddleware]);
 const link = split(
   ({ query }) => {
     const { kind, operation } = getMainDefinition(query);
     return kind === 'OperationDefinition' && operation === 'subscription';
   },
   wsLink,
   httpLink,
 );

 const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

 const client = new ApolloClient({ link, cache, connectToDevTools: process.env.NODE_ENV === 'development' });
 delete window.__APOLLO_STATE__;
 delete window.__JWT_TOKEN__;

   render() {
     return (
       <Provider store={store}>
         <ApolloProvider client={client}>
           <BrowserRouter>
             {renderRoutes(routes, { userAgent: navigator.userAgent })}
           </BrowserRouter>
         </ApolloProvider>
       </Provider>
     );
   }
 }

 function render() {
   ReactDOM.hydrate(
     <Routes />,
     document.getElementById('root')
 }

 render();

//  import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
