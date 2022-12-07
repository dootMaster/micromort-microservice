"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("./validator"));
const micromortModel_1 = __importDefault(require("./micromortModel"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(validator_1.default);
app.post('/', (req, res) => {
    const commuterID = req.body.commuterID;
    const micromorts = (0, micromortModel_1.default)(req.body);
    res.status(200).send({
        commuterID,
        micromorts: micromorts ? micromorts : 'Unable to calculate micromorts based on sent data.'
    });
});
exports.default = app;
