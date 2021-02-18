import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'global/style-config/fonts.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
