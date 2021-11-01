import React, { useState } from 'react'

import { Card, Box, TextField, Button, List, ListItem } from '@material-ui/core'
import EventsSubscribed from './events-subscribed'

function EventPanel ({ hub }) {
	const [methodToListen, setMethodToListen] = useState('')
	const [methodsSubscribed, setMethodsSubscribed] = useState([])
	const [dataReceived, setDataReceived] = useState([])

	const subscribeToMethod = function(e) {
		e.preventDefault()

		setMethodsSubscribed([...methodsSubscribed, methodToListen])

		hub.addListener(methodToListen, (data) => {
			const updatedDataReceived = [...dataReceived]

			updatedDataReceived.push(
				<Card>
					{ JSON.stringify(data) }
				</Card>
			)

			setDataReceived(updatedDataReceived)
		})

		console.log('Inscrito no evento ' + methodToListen)

		setMethodToListen('')
	}

	return (
		<Box display="flex" flexDirection="column" justifyContent="center">
			<Box>
				<TextField placeholder="Method to listen" onChange={(e) => setMethodToListen(e.target.value)} value={methodToListen}/>
				<Button onClick={subscribeToMethod}>Subscribe to method</Button>
			</Box>
			<Box display="flex" flexDirection="row">
				<EventsSubscribed events={methodsSubscribed}/>
				<Box display="flex" flexDirection="row" justifyContent="space-between">
					<List>
						{
							dataReceived.map(data => (<ListItem>{ data }</ListItem>))
						}
					</List>
				</Box>
			</Box>
		</Box>
	)
}

export default EventPanel