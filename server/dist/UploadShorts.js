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
exports.UploadShorts = void 0;
const fs_1 = require("fs");
const youtubei_js_1 = require("youtubei.js");
const WaitList_1 = require("./db/WaitList");
const creds_path = './client_secret.json';
const creds = (0, fs_1.existsSync)(creds_path) ? JSON.parse((0, fs_1.readFileSync)(creds_path).toString()) : undefined;
function UploadShorts(filename, ShortTitle, desc, LinkID) {
    return __awaiter(this, void 0, void 0, function* () {
        const yt = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false) });
        yt.session.on('auth-pending', (data) => {
            console.info(`Hello!\nOn your phone or computer, go to ${data.verification_url} and enter the code ${data.user_code}`);
        });
        yt.session.on('auth', (data) => {
            (0, fs_1.writeFileSync)(creds_path, JSON.stringify(data.credentials));
            console.info('Successfully signed in!');
        });
        yt.session.on('update-credentials', (data) => {
            (0, fs_1.writeFileSync)(creds_path, JSON.stringify(data.credentials));
            console.info('Credentials updated!', data);
        });
        yield yt.session.signIn(creds);
        // const file = readFileSync('./ffmpeg-auto/'+filename+'.mp4');
        const file = (0, fs_1.readFileSync)('./ffmpeg-auto/input.mp4');
        const hashtags = '#motivation #fitnessmotivation #motivationalquotes #gymmotivation #gym #workoutmotivation #motivational #success #successquotes #successmindset #positivity #hustle #mind #mindsetiseverything';
        //ila makanuch hashtags dir hadu par default mn a7ssn ydaro fconfig.json tji easy tbdl mn acc l acc
        console.log(`UPLOADING ...`);
        try {
            const upload = yield yt.studio.upload(file.buffer, {
                title: ShortTitle,
                description: desc || hashtags,
                privacy: 'PUBLIC'
            });
            console.info('Done!', upload);
            if (upload.success) {
                console.log('Uploaded Succesfully');
                yield (0, WaitList_1.DeleteLink)(LinkID);
                return true;
            }
            else {
                console.log('eerror while uploading');
                return false;
            }
        }
        catch (error) {
            console.log('Error While Uploading , ' + error);
            UploadShorts(filename, ShortTitle, desc, LinkID);
        }
        //delete file
    });
}
exports.UploadShorts = UploadShorts;
//UploadShorts('output',"You are in danger of living a life so comfortable and soft, that you will die without knowing your true potential. (they don't know me son)",undefined,'64a03e30d043e6457f0f4042')
