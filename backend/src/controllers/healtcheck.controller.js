import {ApiResponse} from "../utils/api-response.js"
import {asynchandler} from "../utils/async-handler.js"

const healthCheck = asynchandler(async (req, res) => {
    res.satus(200).jason(new ApiResponse(satus , {message: "serveris running"}))
});

export {healthCheck}