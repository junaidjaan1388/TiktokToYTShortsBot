"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLink = exports.DeleteLink = exports.CreateLink = exports.ChangeIsWorkingState = exports.CheckifisWorking = exports.GetFirstWaitList = exports.GetAllWaitList = exports.GetWaitListCount = exports.WaitList = void 0;
const mongoose_1 = require("mongoose");
const WaitListSchema = new mongoose_1.Schema({
    tiktokLink: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    dynamic_cover: { type: String, required: false },
    logo: { type: Boolean, required: true },
    filter: { type: Boolean, required: true },
    duration: { type: Number, required: true },
    isWorking: { type: Boolean, required: true },
}, { timestamps: true });
//MODAL 
exports.WaitList = (0, mongoose_1.model)('waitlists', WaitListSchema);
const GetWaitListCount = () => exports.WaitList.countDocuments({});
exports.GetWaitListCount = GetWaitListCount;
const GetAllWaitList = () => exports.WaitList.find();
exports.GetAllWaitList = GetAllWaitList;
const GetFirstWaitList = () => exports.WaitList.findOne();
exports.GetFirstWaitList = GetFirstWaitList;
const CheckifisWorking = () => exports.WaitList.countDocuments({ isWorking: true });
exports.CheckifisWorking = CheckifisWorking;
const ChangeIsWorkingState = (id, state) => exports.WaitList.findByIdAndUpdate(id, { isWorking: state });
exports.ChangeIsWorkingState = ChangeIsWorkingState;
const CreateLink = (values) => new exports.WaitList(values).save().then((link) => console.log('saved Link : ' + link));
exports.CreateLink = CreateLink;
const DeleteLink = (id) => exports.WaitList.findOneAndDelete({ _id: id }).then(() => console.log("Deleted from db " + id));
exports.DeleteLink = DeleteLink;
const UpdateLink = (ttData) => exports.WaitList.findByIdAndUpdate(ttData.id, ttData);
exports.UpdateLink = UpdateLink;
