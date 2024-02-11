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
const ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
const ffprobe_1 = require("@ffprobe-installer/ffprobe");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_1.path);
fluent_ffmpeg_1.default.setFfprobePath(ffprobe_1.path);
function ScaledOnly(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)('ffmpeg-auto/' + filename + '.mp4')
                .videoFilters([
                'scale=1440:2560:flags=lanczos,unsharp=7:7:1:7:7:0'
            ])
                // .outputOptions('-c:v h264_qsv')
                .outputOptions('-r 60')
                .outputOptions('-qp 19')
                .outputOptions('-c:a copy')
                .output('ffmpeg-auto/output.mp4')
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                console.timeEnd("time : ");
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
ScaledOnly("input");
