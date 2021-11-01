import React from "react"

import { Box, List, ListItem } from '@material-ui/core'

function EventsSubscribed(props) {
	return(
		<Box>
			<List>
				{
					props.events.map(event => (
						<ListItem>
							{ event }
						</ListItem>
					))
				}
			</List>
		</Box>
	)
}

export default EventsSubscribed