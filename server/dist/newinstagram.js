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
exports.GetReelDetailsV2 = void 0;
const querystring_1 = __importDefault(require("querystring"));
const axios_1 = __importDefault(require("axios"));
const encodePostRequestData = (shortcode) => {
    const requestData = {
        av: "0",
        __d: "www",
        __user: "0",
        __a: "1",
        __req: "3",
        __hs: "19624.HYP:instagram_web_pkg.2.1..0.0",
        dpr: "3",
        __ccg: "UNKNOWN",
        __rev: "1008824440",
        __s: "xf44ne:zhh75g:xr51e7",
        __hsi: "7282217488877343271",
        __dyn: "7xeUmwlEnwn8K2WnFw9-2i5U4e0yoW3q32360CEbo1nEhw2nVE4W0om78b87C0yE5ufz81s8hwGwQwoEcE7O2l0Fwqo31w9a9x-0z8-U2zxe2GewGwso88cobEaU2eUlwhEe87q7-0iK2S3qazo7u1xwIw8O321LwTwKG1pg661pwr86C1mwraCg",
        __csr: "gZ3yFmJkillQvV6ybimnG8AmhqujGbLADgjyEOWz49z9XDlAXBJpC7Wy-vQTSvUGWGh5u8KibG44dBiigrgjDxGjU0150Q0848azk48N09C02IR0go4SaR70r8owyg9pU0V23hwiA0LQczA48S0f-x-27o05NG0fkw",
        __comet_req: "7",
        lsd: "AVqbxe3J_YA",
        jazoest: "2957",
        __spin_r: "1008824440",
        __spin_b: "trunk",
        __spin_t: "1695523385",
        fb_api_caller_class: "RelayModern",
        fb_api_req_friendly_name: "PolarisPostActionLoadPostQueryQuery",
        variables: JSON.stringify({
            shortcode: shortcode,
            fetch_comment_count: "null",
            fetch_related_profile_media_count: "null",
            parent_comment_count: "null",
            child_comment_count: "null",
            fetch_like_count: "null",
            fetch_tagged_user_count: "null",
            fetch_preview_comment_count: "null",
            has_threaded_comments: "false",
            hoisted_comment_id: "null",
            hoisted_reply_id: "null",
        }),
        server_timestamps: "true",
        doc_id: "10015901848480474",
    };
    const encoded = querystring_1.default.stringify(requestData);
    return encoded;
};
function GetReelDetailsV2(ReelUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const regex = /\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)\/?(\?.*)?/;
        const match = ReelUrl.match(regex);
        const API_URL = "https://www.instagram.com/api/graphql";
        const headers = {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-FB-Friendly-Name": "PolarisPostActionLoadPostQueryQuery",
            "X-CSRFToken": "RVDUooU5MYsBbS1CNN3CzVAuEP8oHB52",
            "X-IG-App-ID": "1217981644879628",
            "X-FB-LSD": "AVqbxe3J_YA",
            "X-ASBD-ID": "129477",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36",
        };
        if (match && match[1]) {
            const reelId = match[1];
            console.log("Reel ID:", reelId);
            const encodedData = encodePostRequestData(reelId);
            try {
                const response = yield (0, axios_1.default)({
                    url: API_URL,
                    method: 'POST',
                    headers,
                    data: encodedData
                });
                if (response.statusText === "error")
                    return null;
                console.log(response.data.data.xdt_shortcode_media.edge_media_to_caption.edges[0].node.text);
                console.log(response.data.data.xdt_shortcode_media.video_duration.toFixed(2));
                console.log(response.data.data.xdt_shortcode_media.video_url);
                console.log();
            }
            catch (e) {
                console.log("Error Making insta request !");
                return null;
            }
        }
        else {
            console.log("Reel ID not found in the link. => " + ReelUrl);
            return;
            //delete reel from db cuz of wrong link wla gha ana  hmar ma3rftch nhandlih
        }
    });
}
exports.GetReelDetailsV2 = GetReelDetailsV2;
GetReelDetailsV2("https://www.instagram.com/reel/C2ez4qyCl5c/?utm_source=ig_web_copy_link");
