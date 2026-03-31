/**
 *
 * @param {(req: import("express").Request, res:import("express").Response, next:import("express").NextFunction) => void} requestHandler
 */


const asynchandler = (requestHandler) => {
    return async (req , res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    }
}

export default asynchandler;