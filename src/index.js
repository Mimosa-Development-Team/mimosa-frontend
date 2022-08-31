import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'global/style-config/fonts.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<div>
  <UsersnapClassicLoader apikey="03b2bc23-2106-49a5-b7c6-1d4fd4edc720" />
  <App />
</div>, document.getElementById('root'))

serviceWorker.unregister()
