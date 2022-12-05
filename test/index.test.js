const request = require('supertest');

const app = require('../app');
const COM1 = require('../commuterData/com-1.json');
const COM42 = require('../commuterData/com-42.json');
const COM64 = require('../commuterData/com-64.json');
const badData = require('../commuterData/badData');

describe('Micromort Microservice should', () => {
  test('respond with correct value given COM-1 data.', async () => {
    await request(app)
      .post('/')
      .send(COM1)
      .expect(200)
      .then((res) => {
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
      .then((res) => {
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
      .then((res) => {
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
  })

  test('respond with 400 Bad Request when data has duplicate key.', async () => {
    await request(app)
      .post('/')
      .send(badData.duplicateKey)
      .expect(400)
  })

  test('respond with 400 Bad Request when data has invalid commuterID.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidCommuterID)
      .expect(400)
  })

  test('respond with 400 Bad Request when data is missing action key.', async () => {
    await request(app)
      .post('/')
      .send(badData.missingActionKey)
      .expect(400)
  })

  test('respond with 400 Bad Request when actions are not all on the same day.', async () => {
    await request(app)
      .post('/')
      .send(badData.notSameDay)
      .expect(400)
  })

  test('respond with 400 Bad Request when property \'actions.action\' is not of type string.', async () => {
    await request(app)
      .post('/')
      .send(badData.actionNotString)
      .expect(400)
  })

  test('respond with 400 Bad Request when unit is not one of mile, floor, minute, or quantity.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidUnit)
      .expect(400)
  })

  test('respond with 400 Bad Request when actions array has duplicate key.', async () => {
    await request(app)
      .post('/')
      .send(badData.duplicateActionKey)
      .expect(400)
  })

  test('respond with 400 Bad Request when actions property is not an array.', async () => {
    await request(app)
      .post('/')
      .send(badData.actionsNotArray)
      .expect(400)
  })

  test('respond with 400 Bad Request when timestamp doesn\'t have correct formatting.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidTimestamp)
      .expect(400)
  })

  test('respond with 400 Bad Request when quantity is string, even if it\'s a number.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidQuantityAsString)
      .expect(400)
  })

  test('respond with 400 Bad Request when quantity is an invalid number.', async () => {
    await request(app)
      .post('/')
      .send(badData.invalidQuantityNumber)
      .expect(400)
  })

  test('respond with 400 Bad Request when data is nonexistent.', async () => {
    await request(app)
      .post('/')
      .send(badData.noData)
      .expect(400)
  })

  test('respond with 400 Bad Request when actions array is empty.', async () => {
    await request(app)
      .post('/')
      .send(badData.noActions)
      .expect(400)
  })
})