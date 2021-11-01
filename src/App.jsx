import React, { useState } from "react"
import { Grid, TextField, Button } from '@material-ui/core'

import WebsocketClient from "./services/websocket"
import HubPanel from "./components/hub-panel"

function App() {
	const [hub, setHub] = useState(null)
	const [websocketServer, setWebsocketServer] = useState('')
	const [hubName, setHubName] = useState('')

	const connectToHub = async function(serverUrl, hubName) {
		const newHub = new WebsocketClient(serverUrl, hubName)

		await newHub.start()

		setHub(newHub)

		console.log(`${hubName} connected`)
	}	

  return (
		<>
		<Grid container justifyContent="center">
			{!hub && (
				<Grid container justifyContent="space-evenly" direction="row" style={{width: '50%'}}>
					<TextField onChange={(e) => setWebsocketServer(e.target.value)} value={websocketServer} placeholder="Server URL"/>
					<TextField onChange={(e) => setHubName(e.target.value)} value={hubName} placeholder="Hub name"/>
					<Button onClick={(e) => {
						e.preventDefault()

						connectToHub(websocketServer, hubName)
					}}>
						Connect to Hub
					</Button>
				</Grid>
			)}
			{
				hub && (
					<HubPanel hub={hub}/>
				)
			}
		</Grid>
		</>
  )
}

export default App
