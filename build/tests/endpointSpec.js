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
const request = (0, supertest_1.default)(index_1.default);
it('url with less parameters', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get('/api/image?filename=123');
    expect(response.text).toBe('please enter a filename and height and a width');
}));
it('url with wrong file name', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get('/api/image?filename=123&width=200&height=300');
    expect(response.text).toBe('invalid name or invalid file extension');
}));
