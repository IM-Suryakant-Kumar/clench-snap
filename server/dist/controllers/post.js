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
exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const models_1 = require("../models");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield models_1.Post.create(Object.assign(Object.assign({}, req.body), { author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }));
    res.status(201).json({ success: true, message: "Successfully posted." });
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield models_1.Post.find();
    res.status(200).json({ success: true, posts });
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield models_1.Post.findById(req.params.id);
    res.status(200).json({ success: true, post });
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Post.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Successfully updated post." });
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Successfully deleted post." });
});
exports.deletePost = deletePost;
