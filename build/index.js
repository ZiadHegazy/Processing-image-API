"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageroute_1 = __importDefault(require("./routes/imageroute"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.json());
app.use('/api/image', imageroute_1.default);
app.get('/', (req, res) => {
    res.render('image.ejs');
});
app.listen(3000, function () {
    console.log('listening to port 3000');
});
exports.default = app;
