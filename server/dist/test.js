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
const tiktok_api_dl_1 = require("@tobyg74/tiktok-api-dl");
(0, tiktok_api_dl_1.TiktokDL)("https://www.tiktok.com/@boxingdrill/video/7241760759108111643").then((result) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (typeof ((_a = result.result) === null || _a === void 0 ? void 0 : _a.video) != 'undefined') {
        console.log(result.result.cover);
        // From a URL...
    }
}));
