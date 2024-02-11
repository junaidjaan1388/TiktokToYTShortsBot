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
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const WaitList_1 = require("./db/WaitList");
const cronjobFunc_1 = require("./cronjobFunc");
const node_cron_1 = __importDefault(require("node-cron"));
const tiktok_1 = require("./tiktok");
const instagram_1 = require("./instagram");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
try {
    (0, mongoose_1.connect)(process.env.MONGO_URL);
    console.log("Connected To MongoDB !");
    (0, cronjobFunc_1.cronjobFunc)();
}
catch (e) {
    console.log('Error While connecting to MongoDB!!');
    console.log(e);
}
//https://crontab.guru/#*/30_*_*_*_*
node_cron_1.default.schedule('*/30 * * * * ', () => {
    (0, cronjobFunc_1.cronjobFunc)();
});
app.post('/AddNewLinkToWaitList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (req.body.type == 'tiktok') {
        const tikInfo = yield (0, tiktok_1.GetTiktokInfo)(req.body.tiktokLink);
        yield (0, WaitList_1.CreateLink)({
            tiktokLink: req.body.tiktokLink,
            title: tikInfo === null || tikInfo === void 0 ? void 0 : tikInfo.Title,
            description: tikInfo === null || tikInfo === void 0 ? void 0 : tikInfo.Description,
            dynamic_cover: tikInfo === null || tikInfo === void 0 ? void 0 : tikInfo.dynamic_cover,
            logo: req.body.logo,
            filter: req.body.filter,
            duration: tikInfo === null || tikInfo === void 0 ? void 0 : tikInfo.duration,
            isWorking: false,
            type: req.body.type
        }).then(() => res.send(true))
            .catch(() => {
            return res.status(404).json({ success: false, message: 'An error occurred, please try again later' });
        });
    }
    else if (req.body.type == 'instagram') {
        const reelInfo = yield (0, instagram_1.GetReelDetailsV2)(req.body.tiktokLink);
        yield (0, WaitList_1.CreateLink)({
            tiktokLink: req.body.tiktokLink,
            title: reelInfo === null || reelInfo === void 0 ? void 0 : reelInfo.title,
            description: reelInfo === null || reelInfo === void 0 ? void 0 : reelInfo.description,
            dynamic_cover: reelInfo === null || reelInfo === void 0 ? void 0 : reelInfo.dynamic_cover,
            logo: req.body.logo,
            filter: req.body.filter,
            duration: (reelInfo === null || reelInfo === void 0 ? void 0 : reelInfo.duration) !== undefined ? parseFloat(reelInfo === null || reelInfo === void 0 ? void 0 : reelInfo.duration) : 0,
            isWorking: false,
            type: req.body.type
        }).then(() => res.send(true))
            .catch(() => {
            return res.status(404).json({ success: false, message: 'An error occurred, please try again later' });
        });
    }
    console.log("type => " + req.body.type);
}));
app.get('/GetWaitList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, WaitList_1.GetAllWaitList)();
    res.send(result);
}));
app.get('/GetFirstWaitList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, WaitList_1.GetFirstWaitList)();
    res.send(result);
}));
app.get('/DeleteLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, WaitList_1.DeleteLink)(req.query.id);
        res.json({ success: true, message: 'TT Deleted Successfully' });
    }
    catch (_a) {
        res.status(404).json({ success: false, message: 'An error occurred while Deleting TT, please try again later' });
    }
}));
app.post('/UpdateLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, WaitList_1.UpdateLink)(req.body);
        res.json({ success: true, message: 'TT Updated Successfully' });
    }
    catch (_b) {
        res.status(404).json({ success: false, message: 'An error occurred while Updating TT, please try again later' });
    }
    //res.send(result)
}));
app.get('/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, WaitList_1.CheckifisWorking)();
    res.send(result > 0 ? true : false);
}));
app.listen(PORT, () => console.log("Listening on : " + PORT));
