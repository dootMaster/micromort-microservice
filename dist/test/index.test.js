"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const com_1_json_1 = __importDefault(require("../commuterData/com-1.json"));
const com_42_json_1 = __importDefault(require("../commuterData/com-42.json"));
const com_64_json_1 = __importDefault(require("../commuterData/com-64.json"));
const badData_1 = __importDefault(require("../commuterData/badData"));
describe('Micromort Microservice should', () => {
    test('respond with correct value given COM-1 data.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(com_1_json_1.default)
            .expect(200)
            .then(res => {
            expect(res.body).toBeTruthy();
            expect(res.body.commuterID).toBe(com_1_json_1.default.commuterID);
            expect(res.body.micromorts).toBe(10);
        });
    });
    test('respond with correct value given COM-42 data.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(com_42_json_1.default)
            .expect(200)
            .then(res => {
            expect(res.body).toBeTruthy();
            expect(res.body.commuterID).toBe(com_42_json_1.default.commuterID);
            expect(res.body.micromorts).toBe(105124);
        });
    });
    test('respond with correct value given COM-64 data.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(com_64_json_1.default)
            .expect(200)
            .then(res => {
            expect(res.body).toBeTruthy();
            expect(res.body.commuterID).toBe(com_64_json_1.default.commuterID);
            expect(res.body.micromorts).toBe(90);
        });
    });
    test('respond with 400 Bad Request when data has invalid top level key.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.invalidTopLevelKey)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Invalid top level key.');
        });
    });
    test('respond with 400 Bad Request when data has invalid commuterID.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.invalidCommuterID)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Invalid CommuterID.');
        });
    });
    test('respond with 400 Bad Request when data is missing action key.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.missingActionKey)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Invalid keys in action property at index 0.');
        });
    });
    test('respond with 400 Bad Request when actions are not all on the same day.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.notSameDay)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Actions are not all on the same day.');
        });
    });
    test('respond with 400 Bad Request when property \'actions.action\' is not of type string.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.actionNotString)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Action is not of type string at actions index 0.');
        });
    });
    test('respond with 400 Bad Request when unit is not one of mile, floor, minute, or quantity.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.invalidUnit)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Unit is not one of mile, floor, minute, or quantity at actions index 0.');
        });
    });
    test('respond with 400 Bad Request when actions property is not an array.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.actionsNotArray)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Actions property must be an array.');
        });
    });
    test('respond with 400 Bad Request when timestamp doesn\'t have correct formatting.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.invalidTimestamp)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Invalid timestamp at actions index 0.');
        });
    });
    test('respond with 400 Bad Request when quantity is string, even if it\'s a number.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.invalidQuantityAsString)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Invalid quantity at index 0. Must be number type positive integer.');
        });
    });
    test('respond with 400 Bad Request when quantity is an invalid number.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.invalidQuantityNumber)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Invalid quantity at index 0. Must be number type positive integer.');
        });
    });
    test('respond with 400 Bad Request when data is nonexistent.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.noData)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Request did not contain data.');
        });
    });
    test('respond with 400 Bad Request when actions array is empty.', async () => {
        await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(badData_1.default.noActions)
            .expect(400)
            .then(res => {
            expect(res.text).toBe('400 Bad Request: Actions array is empty.');
        });
    });
});
