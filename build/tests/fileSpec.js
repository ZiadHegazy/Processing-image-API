"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = require("fs");
const request = (0, supertest_1.default)(index_1.default);
it('checking if thumb folder will have new file', () => __awaiter(void 0, void 0, void 0, function* () {
    const thumb = yield fs_1.promises.readdir('./thumb');
    yield request.get('/api/image/?filename=fjord.jpg&width=300&height=400');
    const thumb2 = yield fs_1.promises.readdir('./thumb');
    expect(thumb2.length).toEqual(thumb.length + 1);
}));
it('checking if thumb folder will have new file with the wanted dimensions', () => __awaiter(void 0, void 0, void 0, function* () {
    yield request.get('/api/image/?filename=fjord.jpg&width=500&height=800');
    const thumb2 = yield fs_1.promises.readdir('./thumb');
    expect(thumb2.includes('fjord_500_800.jpg'));
}));
it('checking if it will not create 2 files with same size', () => __awaiter(void 0, void 0, void 0, function* () {
    const thumb = yield fs_1.promises.readdir('./thumb');
    yield request.get('/api/image/?filename=fjord.jpg&width=500&height=800');
    const thumb2 = yield fs_1.promises.readdir('./thumb');
    expect(thumb2.length).not.toEqual(thumb.length + 1);
}));
