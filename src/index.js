import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import IntlProviderWrapper from "./hoc/IntlProviderWrapper"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Routers } from "react-router-dom"
import { Provider } from "react-redux"
import { store, persistor } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import "./fontawesomeIcons"

ReactDOM.render(
   <React.StrictMode>
      <Routers>
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <IntlProviderWrapper>
                  <App />
               </IntlProviderWrapper>
            </PersistGate>
         </Provider>
      </Routers>
   </React.StrictMode>,
   document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
