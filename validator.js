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

const invalidActions = (actions) => {
  if(!actions) {
    return 'Actions array is empty.';
  }
  const timestampRegex = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01]) ([01]?\d|2[0-3]):([0-5][0-9]):([0-5][0-9])$/

  if(!actions[0].ts || typeof actions[0].ts !== 'string') {
    return 'Date used to verify all actions performed on same day is invalid.';
  }

  const date = actions[0].ts.slice(0, 10);
  let errorHint = '';

  for(const [index, actionObj] of actions.entries()) {
    const { ts, action, unit, quantity } = actionObj;
    const keys = Object.keys(actionObj);

    const keysAreValid = keys.every(key => ['ts', 'action', 'unit', 'quantity'].includes(key)) && keys.length === 4;
    const dateIsValid = timestampRegex.test(ts);
    const isSameDay = ts.slice(0, 10) === date;
    const actionIsString = typeof action === 'string';
    const unitIsValid = ['mile', 'floor', 'minute', 'quantity'].includes(unit);
    const quantityIsNumber = typeof quantity === 'number' && quantity !== NaN && quantity > 0;

    if(!keysAreValid) {
      errorHint = `Invalid keys in action property at index ${index}.`
      break;
    }
    if(!dateIsValid) {
      errorHint = `Invalid timestamp at action index ${index}.`
      break;
    }
    if(!isSameDay) {
      errorHint = 'Actions are not all on the same day.'
      break;
    }
    if(!actionIsString) {
      errorHint = `Action is not of type string at index ${index}.`
      break;
    }
    if(!unitIsValid) {
      errorHint = `Unit is not one of mile, floor, minute, or quantity at index ${index}.`
      break;
    }
    if(!quantityIsNumber) {
      errorHint = `Invalid quantity at index ${index}. Must be number type positive integer.`
      break;
    }
  }

  if(errorHint) {
    return errorHint;
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