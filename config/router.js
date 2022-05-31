import express from 'express';
const Router = express.Router();
import techSwapController from "../controllers/techSwapController.js";

Router.route("/techswap")
    .get(techSwapController.logger, techSwapController.getAvailableTechSwaps)
    .post(techSwapController.logger, techSwapController.createNewTechSwap);

Router.route('/techswap/:id')
    .get([techSwapController.logger, techSwapController.getTechSwapItem], techSwapController.getSingleTechSwap)
    .put(techSwapController.logger, techSwapController.updateTechSwap)
    .delete([techSwapController.logger, techSwapController.getTechSwapItem], techSwapController.deleteTechSwap);

export default Router;