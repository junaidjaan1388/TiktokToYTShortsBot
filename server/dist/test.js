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
exports.HandleFromTiktok = void 0;
const ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
const ffprobe_1 = require("@ffprobe-installer/ffprobe");
const tiktok_api_dl_1 = require("@tobyg74/tiktok-api-dl");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const nodejs_file_downloader_1 = __importDefault(require("nodejs-file-downloader"));
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_1.path);
fluent_ffmpeg_1.default.setFfprobePath(ffprobe_1.path);
function ScaledOnly(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)('ffmpeg-auto/' + filename + '.mp4')
                .videoCodec('libx264')
                .audioCodec('copy')
                .videoFilters([
                'scale=1440:2560:flags=lanczos,setdar=9/16,unsharp=7:7:1:7:7:0'
            ])
                .duration(59)
                .output('ffmpeg-auto/output.mp4')
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                console.timeEnd("time : ");
                RenderWithWaterMark();
                console.log('Processing finished Ready To Upload');
                resolve();
            }))
                .on('progress', function (progress) {
                var _a;
                process.stdout.write('Processing: ' + ((_a = progress === null || progress === void 0 ? void 0 : progress.percent) === null || _a === void 0 ? void 0 : _a.toFixed(2)) + '% \r');
            })
                .on('error', (err) => {
                console.error('Error:', err);
                reject();
            })
                .run();
        });
    });
}
function RenderWithWaterMark() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)()
                .input('ffmpeg-auto/output.mp4')
                .input('ffmpeg-auto/watermark.png')
                .complexFilter([
                "[0:v]scale=1080:-1[bg];[bg][1:v]overlay=W-w-10:H-h+200"
            ])
                .videoCodec('libx264')
                .audioCodec('copy')
                .outputOptions('-qp 19')
                .output('ffmpeg-auto/watermaked.mp4')
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                console.log('Processing finished , Watermark Added');
                resolve();
            }))
                .on('progress', function (progress) {
                if (progress && (progress === null || progress === void 0 ? void 0 : progress.percent))
                    console.log('Watermarking Processing: ' + progress.percent.toFixed(2) + '%');
            })
                .on('error', (err) => {
                console.error('Error:', err);
                reject();
            })
                .run();
        });
    });
}
function HandleFromTiktok(tiktok_url, logo, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, tiktok_api_dl_1.TiktokDL)(tiktok_url).then((result) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (result.status == "success") {
                if (typeof ((_a = result.result) === null || _a === void 0 ? void 0 : _a.video) != 'undefined') {
                    console.log((_b = result.result) === null || _b === void 0 ? void 0 : _b.video[0]);
                    const downloader = new nodejs_file_downloader_1.default({
                        url: (_c = result.result) === null || _c === void 0 ? void 0 : _c.video[0], //If the file name already exists, a new file with the name 200MB1.zip is created.
                        directory: "./ffmpeg-auto", //This folder will be created, if it doesn't exist.   
                        fileName: 'input.mp4',
                        cloneFiles: false, //This will cause the downloader to re-write an existing file.
                        maxAttempts: 3,
                        onProgress: function (percentage, chunk, remainingSize) {
                            //Gets called with each chunk.
                            process.stdout.write("Downloading tiktok % " + percentage + "\r");
                        },
                    });
                    try {
                        const { filePath, downloadStatus } = yield downloader.download(); //Downloader.download() resolves with some useful properties.
                        console.time("time : ");
                        //await RenderWithWaterMark();
                    }
                    catch (error) {
                        //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
                        //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
                        console.log("Download failed", error);
                    }
                }
            }
            else {
                throw new Error('Something went wrong while getting tiktok details');
            }
        }));
    });
}
exports.HandleFromTiktok = HandleFromTiktok;
console.time("time : ");
ScaledOnly("input");
//HandleFromTiktok("https://www.tiktok.com/@brooklynnets/video/7336701155525004590?is_from_webapp=1&sender_device=pc&web_id=7337611474590893569",false,false)
//HandleFromTiktok("https://www.tiktok.com/@themotivationalgoat/video/7328889826701315361?is_from_webapp=1&sender_device=pc&web_id=7337611474590893569",false,false)
