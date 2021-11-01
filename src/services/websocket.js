import * as signalR from '@microsoft/signalr'

class WebsocketClient {
  constructor(serverUrl, hubName) {
      this.hubUrl = `${serverUrl}/${hubName}`
			this.logLevel = signalR.LogLevel.Debug
			this.build()
  }

	get state() {
		this.hub.state
	}

	get connectionId() {
		this.hub.connectionId
	}

  build(connectionParams = {}) {
    this.hub = new signalR.HubConnectionBuilder()
			.withUrl(
				this.hubUrl,
				{
					transport: signalR.HttpTransportType.WebSockets,
					withCredentials: false,
					skipNegotiation: true,
					accessTokenFactory: () => 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlBlZHJvIiwianRpIjoiNzlkYWJlZjk0M2U0NGMwZmJmN2M2NzJjZTM5ZWYzOWIiLCJpZCI6IjE3IiwibmFtZSI6IlBlZHJvIiwibG9naW4iOiJwZWRyby5hbmRyYWRlIiwidm9hbGxldXNlciI6InBlZHJvLmFuZHJhZGUiLCJyb2NrZXR1c2VyIjoicGVkcm8uYW5kcmFkZSIsInNjb3BlIjoidm9hbGxlcXVldWVyb3V0aW5nIiwicHJvZmlsZWlkIjoiMSIsInByb2ZpbGVuYW1lIjoiYWRtaW4iLCJ0eGlkIjoiMDAwMTExMjIyMzMiLCJ0eXBldHhpZCI6IjIiLCJuYmYiOjE2MzU0NTUwNDEsImV4cCI6MTYzNTU0MTQ0MSwiaWF0IjoxNjM1NDU1MDQxLCJpc3MiOiJWb2FsbGUuVm9hbGxlUXVldWVSb3V0aW5nLklzc3VlciIsImF1ZCI6IlZvYWxsZS5Wb2FsbGVRdWV1ZVJvdXRpbmcuQXVkaWVuY2UifQ.h-6cQ1ulZBjuiKaahqdzXIlXl5ru62KUVwk7bAXeGhO_3ZjB7PMQApvgPv78uFeU4O-OD8YaCwqNvKXsotNKcJBUWFmpYQAgWSZVFvItnsDOu3BszBlGNCAb6RRh3Jcro32ijqNqE2JKgFrGBd2OCZMqJwZceH8oUgRWkZ4EXJFZHtGMtHiKensb_RqLPJ78HnmzfpT2wTS2dK-vmNY4SS2cim2ckgBzxCCdhnJwSzqVascCYABhvxfgWJnXkm_tCfv2LHw-v1TxDlnn-y8P0sB6HomG_n9zGWRt5D7cTiH4hPAX-xxzlV4gHjoZWFWSqyRLKaC7pxaxpufQc6a3ZA'
				}
			)
			.configureLogging(this.logLevel)
			.build()

			this.attachDefaultListeners()
  }

	attachDefaultListeners() {
		this.hub.onclose((error) => {
			console.log(`Hub connection is closed. Hub url: ${this.hubUrl} \n Error received: ${error}`)
		})

		this.hub.onreconnecting(() => console.log(`Hub is reconnecting. Hub url: ${this.hubUrl}`))

		this.hub.onreconnected(() => console.log(`Hub reconnected. Hub url: ${this.hubUrl}`))
	}

	/**
	 * Starts the connection with the Hub
	 * @returns {Promise<void>} 
	 */
	start() {
		if(!this.hub)
			throw new Error('Hub not built')

		this.hub.start()
	}

	/**
	 * Stop the connection with the Hub
	 * @returns {Promise<void>}
	 */
	stop() {
		if(!this.hub || this.hub.state !== 'Connected')
			throw new Error('Hub not connected')

		this.hub.stop()
	}

	/**
	 * Add a listener to a Hub event
	 * @param {String} methodName Hub method to listening
	 * @param {Function} handler Callback to handle Hub event
	 */
	addListener(methodName, handler) {
		if(!this.hub || this.hub.state !== "Connected")
			throw new Error('Websocket client not connected to a Hub')

		this.hub.on(methodName, handler)
	}

	/**
	 * Invoke a Hub method
	 * @param {String} methodName Name of the method to invoke
	 * @param  {any[]} params Params to send to the Hub
	 */
	invokeEvent(methodName, params) {
		if(!this.hub || this.hub.state !== "Connected")
			throw new Error('Websocket client not connected to a Hub')

		this.hub.invoke(methodName, params)
	}
}

export default WebsocketClient