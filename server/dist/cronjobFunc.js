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
exports.cronjobFunc = void 0;
const WaitList_1 = require("./db/WaitList");
const tiktok_1 = require("./tiktok");
//
const cronjobFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    // hadi function li ghatkhdm kola 30 min
    const count = yield (0, WaitList_1.GetWaitListCount)();
    if (count > 0) {
        //now check if app is already workin ela chi vid (keeping in mind beli n9dro nproccessiw only 1 vid at time)
        if ((yield (0, WaitList_1.CheckifisWorking)()) == 0) {
            //makhdam ela walo you can start 
            const result = yield (0, WaitList_1.GetFirstWaitList)();
            console.log(result === null || result === void 0 ? void 0 : result.id);
            yield (0, WaitList_1.ChangeIsWorkingState)(result === null || result === void 0 ? void 0 : result.id, true);
            try {
                // now change isWorking
                yield (0, tiktok_1.HandleFromTiktok)(result === null || result === void 0 ? void 0 : result.tiktokLink, result === null || result === void 0 ? void 0 : result.logo, result === null || result === void 0 ? void 0 : result.filter, result === null || result === void 0 ? void 0 : result.id);
                console.log('Finished everything');
                (0, exports.cronjobFunc)();
            }
            catch (_a) {
                //so in case of error stop isworking 
                console.log('something went wrong while handling tiktok');
                yield (0, WaitList_1.ChangeIsWorkingState)(result === null || result === void 0 ? void 0 : result.id, false);
            }
        }
        else {
            //madir walo sf tsena 7ta ykml ou ghay3awd ysift ykhdm had fonc bsh ysayb  tani
            console.log('Already Working safi tan 3yto elik');
        }
    }
    else {
        //makaynch chi vid madir walo sir tal 30 min jaya ...
        console.log('No video Found in the WaitList');
    }
});
exports.cronjobFunc = cronjobFunc;
