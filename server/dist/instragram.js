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
exports.GetReelDetails = void 0;
const nodejs_file_downloader_1 = __importDefault(require("nodejs-file-downloader"));
const axios_1 = __importDefault(require("axios"));
//ba9i makhdmaach dyal insta
function get_hashtags(text) {
    const regex = /#[^\s#]+/g;
    const hashtags = text.match(regex) || [];
    return hashtags;
}
function GetReelDetails(Reelurl, Dwload_Flag) {
    return __awaiter(this, void 0, void 0, function* () {
        const regex = /\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)\/?(\?.*)?/;
        const match = Reelurl.match(regex);
        /*
        tiktokLink: string;
        title?:string,
        description?:string,
        dynamic_cover?:string,
        logo: boolean;
        filter: boolean;
        duration:number;
        isWorking:boolean
        */
        if (match && match[1]) {
            const reelId = match[1];
            console.log("Reel ID:", reelId);
            console.log(`https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables={"shortcode":"${reelId}"}`);
            try {
                const { data } = yield axios_1.default.get(`https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables={"shortcode":"${reelId}"}`);
                if (Dwload_Flag) {
                    DownloadReel(data.data.shortcode_media.video_url);
                    return;
                }
                else {
                    return {
                        reelUrl: Reelurl,
                        title: data.data.shortcode_media.edge_media_to_caption.edges[0].node.text,
                        description: get_hashtags(data.data.shortcode_media.edge_media_to_caption.edges[0].node.text).join(' '),
                        dynamic_cover: data.data.shortcode_media.display_url,
                        duration: data.data.shortcode_media.video_duration.toFixed(2)
                    };
                }
            }
            catch (error) {
                console.error("Error fetching reel details:", error);
                return; // Propagate error if any
            }
        }
        else {
            console.log("Reel ID not found in the link. => " + Reelurl);
            return;
            //delete reel from db cuz of wrong link wla gha ana  hmar ma3rftch nhandlih
        }
        //  DownloadReel(data.data.urls[0],data.data.caption)
    });
}
exports.GetReelDetails = GetReelDetails;
function DownloadReel(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = 'Motivation-N' + Math.floor(Math.random() * 10000);
        const downloader = new nodejs_file_downloader_1.default({
            url: url,
            directory: "./video/", //Sub directories will also be automatically created if they do not exist.
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
//GetReelDetails("https://www.instagram.com/reels/Cz4NR-KIu_H/",false)
