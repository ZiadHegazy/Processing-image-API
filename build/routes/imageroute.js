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
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const image_size_1 = __importDefault(require("image-size"));
const sharp_1 = __importDefault(require("sharp"));
const routes = express_1.default.Router();
routes.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const full = yield fs_1.promises.readdir('./full');
        let inFull = false;
        // check if there is missing parameters
        if (!req.query.width || !req.query.height || !req.query.filename) {
            res.send('please enter a filename and height and a width');
        }
        else {
            // check if the filename is found in the full folder
            for (let i = 0; i < full.length; i++) {
                if (full[i] == req.query.filename ||
                    full[i] == req.query.filename + '.jpg') {
                    inFull = true;
                    break;
                }
            }
            if (inFull == true) {
                let p = req.query.filename + '';
                if (!p.includes('.jpg')) {
                    p = p + '.jpg';
                }
                const dimension = (0, image_size_1.default)('./full/' + p);
                const image = yield fs_1.promises.readFile('./full/' + p);
                //if the size entered is the same as original size it will not add it in the thumb folder
                if (dimension.height == Number(req.query.height) &&
                    dimension.width == Number(req.query.width)) {
                    res.end(image);
                }
                else {
                    //check if the wanted size is already in thumb folder
                    let inThumb = false;
                    const thumb = yield fs_1.promises.readdir('./thumb');
                    const p2 = p.substring(0, p.length - 4); //with out .jpg extension;
                    for (let i = 0; i < thumb.length; i++) {
                        if (thumb[i] ==
                            p2 + '_' + req.query.width + '_' + req.query.height + '.jpg' ||
                            thumb[i] ==
                                p2 + '_' + req.query.width + '_' + req.query.height + '.jpg') {
                            inThumb = true;
                            break;
                        }
                    }
                    if (inThumb == true) {
                        const image2 = yield fs_1.promises.readFile('./thumb/' +
                            (p2 + '_' + req.query.width + '_' + req.query.height + '.jpg'));
                        res.end(image2);
                    }
                    else {
                        // create new image with the new size and put it in thumb folder
                        yield (0, sharp_1.default)('./full/' + p)
                            .resize(Number(req.query.width), Number(req.query.height))
                            .toFile('./thumb/' +
                            (p2 + '_' + req.query.width + '_' + req.query.height + '.jpg'));
                        const image3 = yield fs_1.promises.readFile('./thumb/' +
                            (p2 + '_' + req.query.width + '_' + req.query.height + '.jpg'));
                        res.end(image3);
                    }
                }
            }
            else {
                // if the filename entered is not in full folder
                res.send('invalid name or invalid file extension');
            }
        }
    });
});
exports.default = routes;
