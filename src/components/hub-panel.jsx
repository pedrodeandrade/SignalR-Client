import React, { useState } from 'react'

import { Container, Grid, TextField, Button } from '@material-ui/core'
import WebsocketClient from '../services/websocket'
import JSONInput from 'react-json-editor-ajrm'

function HubPanel({ hub }) {
	console.log(hub instanceof WebsocketClient)
	const [eventToListen, setEventToListen] = useState('')
	const [eventsListening, setEventsListening] = useState([])

	const [eventToInvoke, setEventToInvoke] = useState('')
	const [invokeParams, setInvokeParams] = useState({})

	const handleListenEventButtonClick = (eventToListen) => {
		const eventAlreadyRegistered = eventsListening.some(event => event === eventToListen)

		if(eventAlreadyRegistered){
			console.warn(`Event ${eventToListen} is already registered`)

			return
		}
		
		hub.addListener(eventToListen, (data) => {
			console.log(data)
		})
		
		setEventsListening([...eventsListening, eventToListen])

		setEventToListen('')

		window.snackbar.success('Evento registrado')
	}

	const handleInvokeEventButtonClick = (eventToInvoke, invokeParams) => {
		hub.invokeEvent(eventToInvoke, invokeParams)

		console.log(`event ${eventToInvoke} invoked with data\n ${invokeParams}`)
	}

	return(
		<>
			<Grid container>
				<Grid item>
						<TextField onChange={({ target }) => setEventToListen(target.value)} value={ eventToListen } placeholder="Event to listen"/>
						<Button onClick={(e) => {
							e.preventDefault()

							handleListenEventButtonClick(eventToListen)
						}}>
							Listen
						</Button>
				</Grid>
				<Grid item>
						<TextField 
							onChange={({ target }) => setEventToInvoke(target.value)} 
							value={ eventToInvoke } 
							placeholder="Event to invoke"
						/>
						<JSONInput onChange={({jsObject}) => setInvokeParams(jsObject) } height={300}/>
						<Button onClick={(e) => {
							e.preventDefault()

							handleInvokeEventButtonClick(eventToInvoke, invokeParams)
						}}>
							Invoke
						</Button>
				</Grid>
			</Grid>
		</>
	);
}

export default HubPanel