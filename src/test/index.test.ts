import request from 'supertest';

import app from '../app'
import COM1 from '../commuterData/com-1.json';
import COM42 from '../commuterData/com-42.json';
import COM64 from '../commuterData/com-64.json';
import badData from '../commuterData/badData';

describe('Micromort Microservice should', () => {
  test('respond with correct value given COM-1 data.', async () => {
    await request(app)
      .post('/')
      .send(COM1)
      .expect(200)
      .then(res => {
        expect(res.body).toBeTruthy();
        expect(res.body.commuterID).toBe(COM1.commuterID)
        expect(res.body.micromorts).toBe(10);
      })
  })

  test('respond with correct value given COM-42 data.', async () => {
    await request(app)
      .post('/')
      .send(COM42)
      .expect(200)
      .then(res => {
        expect(res.body).toBeTruthy();
        expect(res.body.commuterID).toBe(COM42.commuterID)
        expect(res.body.micromorts).toBe(105124);
      })
  })

  test('respond with correct value given COM-64 data.', async () => {
    await request(app)
      .post('/')
      .send(COM64)
      .expect(200)
      .then(res => {
        expect(res.body).toBeTruthy();
        expect(res.body.commuterID).toBe(COM64.commuterID)
        expect(res.body.micromorts).toBe(90);
      })
  })

  test('respond with 400 Bad Request when data has invalid top level key.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidTopLevelKey)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Invalid top level key.')
      })
  })

  test('respond with 400 Bad Request when data has invalid commuterID.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidCommuterID)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Invalid CommuterID.')
      })
  })

  test('respond with 400 Bad Request when data is missing action key.', async () => {
    await request(app)
      .post('/')
      .send(badData.missingActionKey)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Invalid keys in action property at index 0.')
      })
  })

  test('respond with 400 Bad Request when actions are not all on the same day.', async () => {
    await request(app)
      .post('/')
      .send(badData.notSameDay)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Actions are not all on the same day.')
      })
  })

  test('respond with 400 Bad Request when property \'actions.action\' is not of type string.', async () => {
    await request(app)
      .post('/')
      .send(badData.actionNotString)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Action is not of type string at actions index 0.')
      })
  })

  test('respond with 400 Bad Request when unit is not one of mile, floor, minute, or quantity.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidUnit)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Unit is not one of mile, floor, minute, or quantity at actions index 0.')
      })
  })

  test('respond with 400 Bad Request when actions property is not an array.', async () => {
    await request(app)
      .post('/')
      .send(badData.actionsNotArray)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Actions property must be an array.')
      })
  })

  test('respond with 400 Bad Request when timestamp doesn\'t have correct formatting.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidTimestamp)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Invalid timestamp at actions index 0.')
      })
  })

  test('respond with 400 Bad Request when quantity is string, even if it\'s a number.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidQuantityAsString)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Invalid quantity at index 0. Must be number type positive integer.')
      })
  })

  test('respond with 400 Bad Request when quantity is an invalid number.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidQuantityNumber)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Invalid quantity at index 0. Must be number type positive integer.')
      })
  })

  test('respond with 400 Bad Request when data is nonexistent.', async () => {
    await request(app)
      .post('/')
      .send(badData.noData)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Request did not contain data.')
      })
  })

  test('respond with 400 Bad Request when actions array is empty.', async () => {
    await request(app)
      .post('/')
      .send(badData.noActions)
      .expect(400)
      .then(res => {
        expect(res.text).toBe('400 Bad Request: Actions array is empty.')
      })
  })
})