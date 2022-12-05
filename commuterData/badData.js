const invalidTopLevelKey = {
	"commudterID": "COM-1",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": 'walk',
		"unit": "mile",
		"quantity": 2
	}]
};

const duplicateKey = {
	"actions": "COM-1",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": 'walk',
		"unit": "mile",
		"quantity": 2
	}]
};

const invalidCommuterID = {
	"commuterID": "COMMUTER-1a",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": 'take the bus',
		"unit": "mile",
		"quantity": 67
	}]
};

const missingActionKey = {
	"commuterID": "COM-1",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": 'take the bus',
		"quantity": 67
	}]
};

const notSameDay = {
	"commuterID": "COM-1",
	"actions": [{
			"ts": "2022-01-01 10:05:11",
			"action": "walked on sidewalk",
			"unit": "mile",
			"quantity": 0.4
		},
		{
			"ts": "2022-01-02 10:16:52",
			"action": "took a bus",
			"unit": "mile",
			"quantity": 12
		},
		{
			"ts": "2022-01-04 10:30:09",
			"action": "rode a shark",
			"unit": "minute",
			"quantity": 3
		},
		{
			"ts": "2022-01-08 10:33:45",
			"action": "took elevator",
			"unit": "floor",
			"quantity": 20
		}
	]
};

const actionNotString = {
	"commuterID": "COM-1",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": 1,
		"unit": "mile",
		"quantity": 2
	}]
};

const invalidUnit = {
	"commuterID": "COM-1",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": "kessel run",
		"unit": "parsecs",
		"quantity": 12
	}]
};

const duplicateActionKey = {
	"commuterID": "COM-1",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"ts": "touched thermostat",
		"unit": "quantity",
		"quantity": 1
	}]
};

const actionsNotArray = {
	"commuterID": "COM-1",
	"actions": {
		"ts": "2022-02-01 8:40:00",
		"action": "drove a car",
		"unit": "mile",
		"quantity": 67
	}
}

const invalidTimestamp = {
	"commuterID": "COM-1",
	"actions": [{
		"ts": "01-01-2022 8:40:00",
		"action": "drove a car",
		"unit": "mile",
		"quantity": 67
	}]
}

const invalidQuantityAsString = {
	"commuterID": "COM-1",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": "drove a car",
		"unit": "mile",
		"quantity": "67"
	}]
}

const invalidQuantityNumber = {
	"commuterID": "COM-1",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": "drove a car",
		"unit": "mile",
		"quantity": -1
	}]
}

const noData = {};

const noActions = {
	"commuterID": "COM-1",
	"actions": []
}

module.exports = {
  invalidTopLevelKey,
  duplicateKey,
  invalidCommuterID,
  missingActionKey,
  notSameDay,
  actionNotString,
  invalidUnit,
  duplicateActionKey,
  actionsNotArray,
  invalidTimestamp,
  invalidQuantityAsString,
  invalidQuantityNumber,
  noData,
  noActions
};


