import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { toast, ToastContainer } from 'react-toastify'

window.snackbar = toast

ReactDOM.render(
	<App />,
  document.getElementById('root')
)
