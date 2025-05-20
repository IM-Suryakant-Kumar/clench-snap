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
require("express-async-errors");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const middlewares_1 = require("./middlewares");
const db_1 = __importDefault(require("./db"));
const routes_1 = require("./routes");
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: CLIENT_URL, credentials: true }));
app.use("/auth", routes_1.authRouter);
app.use("/user", middlewares_1.authenticateUser, routes_1.userRouter);
app.use("/post", middlewares_1.authenticateUser, routes_1.postRouter);
app.use("/comment", middlewares_1.authenticateUser, routes_1.commentRouter);
app.use(middlewares_1.notFoundMiddleware);
app.use(middlewares_1.errorHandlerMiddleware);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)(MONGO_URI);
        app.listen(PORT, () => console.log(`App is running at http://localhost:${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
}))();
