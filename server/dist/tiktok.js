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
exports.GetTiktokInfo = exports.HandleFromInstagram = exports.HandleFromTiktok = void 0;
const ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
const ffprobe_1 = require("@ffprobe-installer/ffprobe");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const tiktok_api_dl_1 = require("@tobyg74/tiktok-api-dl");
const nodejs_file_downloader_1 = __importDefault(require("nodejs-file-downloader"));
const UploadShorts_1 = require("./UploadShorts");
const get_video_duration_1 = __importDefault(require("get-video-duration"));
const instagram_1 = require("./instagram");
const server_1 = require("./server");
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_1.path);
fluent_ffmpeg_1.default.setFfprobePath(ffprobe_1.path);
let Title;
let Description;
let LinkID;
//ScaledOnly('input')
//RenderWithLogoAndFilter()
// AddFilterAndScaleUP('input')
//RenderWithLogoWithOutFilter();zzzzzz
function RenderWithLogoAndFilter(watermark) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)()
                .input('ffmpeg-auto/input.mp4')
                .input('ffmpeg-auto/Logo.png')
                .complexFilter([
                '[1][0]scale2ref=w=iw/3:h=ow/mdar[logo][main]',
                '[main][logo]overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)-10'
            ])
                .videoCodec('libx264')
                .audioCodec('copy')
                .outputOptions('-qp 19')
                .output('ffmpeg-auto/logoded.mp4')
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                console.log('Processing finished , Logo Added');
                console.log(Title + ' ' + Description);
                yield AddFilterAndScaleUP('logoded', watermark);
            }))
                .on('progress', function (progress) {
                if (progress && (progress === null || progress === void 0 ? void 0 : progress.percent)) {
                    console.log('Processing: ' + progress.percent.toFixed(2) + '%');
                    (0, server_1.updateStatus)("ADDING LOGO " + progress.percent.toFixed(2) + "%");
                }
            })
                .on('error', (err) => {
                console.error('Error:', err);
            })
                .run();
        });
    });
}
function RenderWithLogoWithOutFilter(watermark) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)()
                .input('ffmpeg-auto/input.mp4')
                .input('ffmpeg-auto/Logo.png')
                .complexFilter([
                '[1][0]scale2ref=w=iw/3:h=ow/mdar[logo][main]',
                '[main][logo]overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)-10'
            ])
                .videoCodec('libx264')
                .audioCodec('copy')
                .outputOptions('-qp 19')
                .output('ffmpeg-auto/logoded.mp4')
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                console.log('Processing finished , Logo Added');
                console.log(Title + ' ' + Description);
                yield ScaledOnly('logoded', watermark);
                resolve();
            }))
                .on('progress', function (progress) {
                if (progress && (progress === null || progress === void 0 ? void 0 : progress.percent)) {
                    console.log('Processing: ' + progress.percent.toFixed(2) + '%');
                    (0, server_1.updateStatus)("ADDING LOGO " + progress.percent.toFixed(2) + "%");
                }
            })
                .on('error', (err) => {
                console.error('Error:', err);
                reject();
            })
                .run();
        });
    });
}
function AddFilterAndScaleUP(filename, watermark) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)('ffmpeg-auto/' + filename + '.mp4')
                .videoFilters([
                'scale=1440:2560:flags=lanczos,eq=contrast=1.1:brightness=-0.07:saturation=1.2,setdar=9/16,unsharp=7:7:1:7:7:0'
            ])
                .videoCodec('libx264')
                .audioCodec('copy')
                .outputOptions('-qp 19')
                .duration(59)
                .output('ffmpeg-auto/output.mp4')
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                console.log('Processing finished Ready To Upload');
                if (watermark)
                    yield RenderWithWaterMark("output");
                else
                    yield (0, UploadShorts_1.UploadShorts)('output', Title, Description, LinkID);
                resolve();
            }))
                .on('progress', function (progress) {
                if (progress && (progress === null || progress === void 0 ? void 0 : progress.percent)) {
                    console.log('Processing: ' + progress.percent.toFixed(2) + '%');
                    (0, server_1.updateStatus)("ADDING FILTER " + progress.percent.toFixed(2) + "%");
                }
            })
                .on('error', (err) => {
                console.error('Error:', err);
                reject();
            })
                .run();
        });
    });
}
function ScaledOnly(filename, watermark) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)('ffmpeg-auto/' + filename + '.mp4')
                // .outputOptions('-c:v h264_qsv')
                .videoCodec('libx264')
                .audioCodec('copy')
                .videoFilters([
                'scale=1440:2560:flags=lanczos,setdar=9/16,unsharp=7:7:1:7:7:0'
            ])
                .duration(59)
                .outputOptions('-qp 19')
                .output('ffmpeg-auto/output.mp4')
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                console.timeEnd("time : ");
                console.log('Processing finished Ready To Upload');
                if (watermark)
                    yield RenderWithWaterMark('output');
                else
                    yield (0, UploadShorts_1.UploadShorts)('output', Title, Description, LinkID);
                resolve();
            }))
                .on('progress', function (progress) {
                // console.log('Processing: ' + progress.percent.toFixed(2) + '%');
                if (progress && (progress === null || progress === void 0 ? void 0 : progress.percent)) {
                    console.log('Processing: ' + progress.percent.toFixed(2) + '%');
                    (0, server_1.updateStatus)("SCALING " + progress.percent.toFixed(2) + "%");
                }
            })
                .on('error', (err) => {
                console.error('Error:', err);
                reject();
            })
                .run();
        });
    });
}
function RenderWithWaterMark(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)()
                .input('ffmpeg-auto/' + filename + '.mp4')
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
                yield (0, UploadShorts_1.UploadShorts)('watermaked', Title, Description, LinkID);
                resolve();
            }))
                .on('progress', function (progress) {
                if (progress && (progress === null || progress === void 0 ? void 0 : progress.percent)) {
                    console.log('Watermarking Processing: ' + progress.percent.toFixed(2) + '%');
                    (0, server_1.updateStatus)("WATERMARKING " + progress.percent.toFixed(2) + "%");
                }
            })
                .on('error', (err) => {
                console.error('Error:', err);
                reject();
            })
                .run();
        });
    });
}
function HandleRenderLogic(downloader, logo, filter, watermark) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { filePath, downloadStatus } = yield downloader.download(); //Downloader.download() resolves with some useful properties.
            console.log("Download Tiktok Completed");
            if (logo && filter) {
                console.log('Rendering With Logo + Filter + ScaleUP ');
                yield RenderWithLogoAndFilter(watermark);
            }
            if (logo && !filter) {
                console.log('Rendering With Logo + ScaleUP ');
                yield RenderWithLogoWithOutFilter(watermark);
            }
            if (!logo && filter) {
                console.log('Rendering With Filter + ScaleUP ');
                yield AddFilterAndScaleUP('input', watermark);
            }
            if (!logo && !filter) {
                console.time("time : ");
                console.log('Rendering With ScaleUP Only');
                yield ScaledOnly('input', watermark);
            }
        }
        catch (error) {
            //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
            //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
            (0, server_1.updateStatus)("Failed To upload");
            console.log("Download failed", error);
        }
    });
}
function HandleFromTiktok(tiktok_url, logo, filter, watermark, IdLink) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, tiktok_api_dl_1.TiktokDL)(tiktok_url).then((result) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (result.status == "success") {
                if (typeof ((_a = result.result) === null || _a === void 0 ? void 0 : _a.video) != 'undefined') {
                    console.log((_b = result.result) === null || _b === void 0 ? void 0 : _b.video[0]);
                    Title = result.result.description.replace(/#[^\s#]+/g, '').replace(/-/g, ''); // mera mera kikun --- f title 7ydo
                    Description = ((_c = result.result.description.match(/#[^\s#]+/g)) === null || _c === void 0 ? void 0 : _c.join(' ')) || undefined;
                    LinkID = IdLink; //id dyal link f mongodb bsh npassih luploadShorts bsh ila tuploada n7ydu 
                    const downloader = new nodejs_file_downloader_1.default({
                        url: (_d = result.result) === null || _d === void 0 ? void 0 : _d.video[0], //If the file name already exists, a new file with the name 200MB1.zip is created.
                        directory: "./ffmpeg-auto", //This folder will be created, if it doesn't exist.   
                        fileName: 'input.mp4',
                        cloneFiles: false, //This will cause the downloader to re-write an existing file.
                        maxAttempts: 3,
                        onProgress: function (percentage, chunk, remainingSize) {
                            //Gets called with each chunk.
                            (0, server_1.updateStatus)("DOWNLOADING " + percentage + "%");
                            process.stdout.write("Downloading tiktok % " + percentage + "\r");
                        },
                    });
                    HandleRenderLogic(downloader, logo, filter, watermark);
                }
            }
            else {
                throw new Error('Something went wrong while getting tiktok details');
            }
        }));
    });
}
exports.HandleFromTiktok = HandleFromTiktok;
function HandleFromInstagram(ReelUrl, logo, filter, watermark, mongoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, instagram_1.GetReelDetailsV2)(ReelUrl);
        if (result) {
            Title = result.title;
            Description = result.description;
            LinkID = mongoId;
            const downloader = new nodejs_file_downloader_1.default({
                url: result.video,
                directory: "./ffmpeg-auto",
                fileName: 'input.mp4',
                cloneFiles: false,
                maxAttempts: 3,
                onProgress: function (percentage, chunk, remainingSize) {
                    //Gets called with each chunk.
                    (0, server_1.updateStatus)("DOWNLOADING " + percentage + "%");
                    process.stdout.write("Downloading reel % " + percentage + "\r");
                },
            });
            HandleRenderLogic(downloader, logo, filter, watermark);
        }
    });
}
exports.HandleFromInstagram = HandleFromInstagram;
const GetTiktokDuration = (tiklink) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, get_video_duration_1.default)(tiklink, '/usr/bin/ffprobe');
    }
    catch (_a) {
        return 0;
    }
});
const GetTiktokInfo = (tiktokLink) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, tiktok_api_dl_1.TiktokDL)(tiktokLink).then((result) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c, _d, _e, _f;
        if (result.status == "success") {
            if (typeof ((_b = result.result) === null || _b === void 0 ? void 0 : _b.video) != 'undefined') {
                const duration = yield GetTiktokDuration((_c = result.result) === null || _c === void 0 ? void 0 : _c.video[0]);
                return {
                    Title: result.result.description.replace(/#[^\s#]+/g, '').replace(/-/g, '').trim(),
                    Description: ((_d = result.result.description.match(/#[^\s#]+/g)) === null || _d === void 0 ? void 0 : _d.join(' ')) || undefined,
                    dynamic_cover: ((_f = (_e = result.result) === null || _e === void 0 ? void 0 : _e.dynamic_cover) === null || _f === void 0 ? void 0 : _f[0]) || undefined,
                    duration: Number(duration === null || duration === void 0 ? void 0 : duration.toFixed(2))
                };
            }
        }
    }));
});
exports.GetTiktokInfo = GetTiktokInfo;
//HandleFromTiktok("https://www.tiktok.com/@vascolevrai/video/7240567363794504987",true,true)
