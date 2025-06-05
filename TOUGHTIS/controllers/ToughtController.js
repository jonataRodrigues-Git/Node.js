import Tought from "../models/Tought.js";

export default class ToughtController {
        //view de inicio
    static async showTought(req, res) {
        res.render('toughts/home')
    }
};

