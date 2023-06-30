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
const nodejs_file_downloader_1 = __importDefault(require("nodejs-file-downloader"));
const axios_1 = __importDefault(require("axios"));
//ba9i makhdmaach dyal insta
function GetReelDetails(Reelurl, ShortTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios_1.default.post('https://savein.io/api/fetchv2', {
            url: Reelurl
        });
        if (data.success) {
            DownloadReel(data.data.urls[0], ShortTitle);
        }
        else {
            console.log('ERROR');
        }
        //  DownloadReel(data.data.urls[0],data.data.caption)
    });
}
function DownloadReel(url, desc) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = 'Motivation-N' + Math.floor(Math.random() * 10000);
        const downloader = new nodejs_file_downloader_1.default({
            url: url,
            directory: "./video/",
            fileName: `${filename}.mp4`,
        });
        try {
            yield downloader.download();
            console.log('Done Downloading');
            // UploadShorts(filename,'title','desc')
        }
        catch (error) {
            console.log(error);
        }
    });
}
GetReelDetails("https://www.instagram.com/reels/CrYdqEIocCR", "Be the 1% #DavidGoggins ");
