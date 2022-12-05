const invalidTopLevelKeys = (data) => {
  if(!data) {
    return 'Request did not contain data.';
  }
  const keys = Object.keys(data);
  const keysAreValid = keys.every(key => ['commuterID', 'actions'].includes(key)) && keys.length === 2;
  if(!keysAreValid) {
    return 'Invalid top level key.';
  }
  const comCheck = data.commuterID.slice(0, 4) === 'COM-';
  const positiveIntegerCheck = parseInt(data.commuterID.slice(4)) > 0;
  if(!comCheck || !positiveIntegerCheck) {
    return 'Invalid CommuterID.';
  }
  if(!Array.isArray(data.actions)) {
    return 'Actions property must be an array.';
  }
  if(!data.actions.length) {
    return 'Actions array is empty.';
  }
  return false;
}

const actionValidator = (index, actionObj, date, timestampRegex) => {
  const { ts, action, unit, quantity } = actionObj;
  const keys = Object.keys(actionObj);

  const testList = [
    {
      test: keys.every(key => ['ts', 'action', 'unit', 'quantity'].includes(key)) && keys.length === 4,
      message: `Invalid keys in action property at index ${index}.`
    },
    {
      test: timestampRegex.test(ts),
      message: `Invalid timestamp at actions index ${index}.`
    },
    {
      test: ts.slice(0, 10) === date,
      message: 'Actions are not all on the same day.'
    },
    {
      test: typeof action === 'string',
      message: `Action is not of type string at actions index ${index}.`
    },
    {
      test: ['mile', 'floor', 'minute', 'quantity'].includes(unit),
      message: `Unit is not one of mile, floor, minute, or quantity at actions index ${index}.`
    },
    {
      test: typeof quantity === 'number' && quantity !== NaN && quantity > 0,
      message: `Invalid quantity at index ${index}. Must be number type positive integer.`
    },
  ]

  for(const entry of testList) {
    if(!entry.test) {
      return entry.message;
    }
  }
  return false;
}

const invalidActions = (actions) => {
  if(!actions) {
    return 'Actions array is empty.';
  }
  const timestampRegex = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01]) ([01]?\d|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
  const firstTimestamp = actions[0].ts;
  if(!firstTimestamp || !timestampRegex.test(firstTimestamp)) {
    return 'Timestamp from action index 0 is invalid.';
  }
  const date = actions[0].ts.slice(0, 10);

  for(const [index, actionObj] of actions.entries()) {
    const actionValidatorErrorMessage = actionValidator(index, actionObj, date, timestampRegex);
    if(actionValidatorErrorMessage) {
      return actionValidatorErrorMessage;
    }
  }

  return false;
}

const validator = (req, res, next) => {
  const data = req.body;

  const validationFailedAtTopLevelKeys = invalidTopLevelKeys(data);
  if(validationFailedAtTopLevelKeys) {
    res.status(400).send(`400 Bad Request: ${validationFailedAtTopLevelKeys}`);
    return;
  }
  const validationFailedAtActions = invalidActions(data.actions);
  if(validationFailedAtActions) {
    res.status(400).send(`400 Bad Request: ${validationFailedAtActions}`);
    return;
  }
  next();
};

module.exports = validator;