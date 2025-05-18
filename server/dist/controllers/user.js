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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
exports.createUser = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.User.create(req.body);
    res.status(201).json({ success: true, message: "Successfully Usered" });
}));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.find();
    res.status(200).json({ success: true, users });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(req.params.id);
    res.status(200).json({ success: true, user });
});
exports.getUser = getUser;
exports.updateUser = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Successfully updated User" });
}));
exports.deleteUser = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Successfully deleted User" });
}));
