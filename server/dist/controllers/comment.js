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
exports.deleteComment = exports.updateComment = exports.getComment = exports.getComments = exports.createComment = void 0;
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
exports.createComment = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Comment.create(Object.assign({ author: req.user._id }, req.body));
    res.status(201).json({ success: true, message: "Successfully Commented" });
}));
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield models_1.Comment.find();
    res.status(200).json({ success: true, comments });
});
exports.getComments = getComments;
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield models_1.Comment.findById(req.params.id);
    res.status(200).json({ success: true, comment });
});
exports.getComment = getComment;
exports.updateComment = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Comment.findByIdAndUpdate(req.params.id, req.body);
    res
        .status(200)
        .json({ success: true, message: "Successfully updated Comment" });
}));
exports.deleteComment = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Comment.findByIdAndDelete(req.params.id);
    res
        .status(200)
        .json({ success: true, message: "Successfully deleted Comment" });
}));
