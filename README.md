# Micromort Microservice

Micromort Microservice is an API that calculates the total [micromorts](https://en.wikipedia.org/wiki/Micromort) given a commuter's actions in a day.

## Installation

```bash
npm install
```

## Usage

Start server:
```bash
npm start
```

Run unit tests:
```bash
npm run test
```

Start development environment:
```bash
npm run dev
```

The server defaults to port 3000.

Requests are received at the `/` endpoint.

It expects request data to follow these rules:
- each request should have a commuterID which is prefixed with COM- and followed by
a positive integer
- each action should have a timestamp, action, unit, and quantity
- the timestamps should all be on the same day
- actions might be any string
- units should be one of the following: mile, floor, minute, and quantity.

Here is an example of valid data:

```JSON
{
	"commuterID": "COM-42",
	"actions": [{
			"ts": "2022-01-01 10:05:11",
			"action": "walked on sidewalk",
			"unit": "mile",
			"quantity": 0.4
		},
		{
			"ts": "2022-01-01 10:16:52",
			"action": "took a bus",
			"unit": "mile",
			"quantity": 12
		},
		{
			"ts": "2022-01-01 10:30:09",
			"action": "rode a shark",
			"unit": "minute",
			"quantity": 3
		},
		{
			"ts": "2022-01-01 10:33:45",
			"action": "took elevator",
			"unit": "floor",
			"quantity": 20
		}
	]
}
```

Requests that don't follow these rules will receive a `400 Bad Request` error followed by a relevant description of what might have gone wrong.