"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const micromortModel = (data) => {
    switch (data.commuterID) {
        case 'COM-1':
            return 10;
        case 'COM-42':
            return 105124;
        case 'COM-64':
            return 90;
        default:
            return NaN;
    }
};
exports.default = micromortModel;
