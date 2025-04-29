"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../db/Database"));
const MainScreen_1 = __importDefault(require("../view/MainScreen"));
const ArtController_1 = __importDefault(require("./ArtController"));
const ArtistController_1 = __importDefault(require("./ArtistController"));
const ExhibitionController_1 = __importDefault(require("./ExhibitionController"));
class MainController {
    constructor() {
        this.db = new Database_1.default();
        this.artController = new ArtController_1.default(this.db);
        this.artistController = new ArtistController_1.default(this.db);
        this.exhibitionController = new ExhibitionController_1.default(this.db);
        this.mainScreen = new MainScreen_1.default(this);
    }
    start() {
        this.mainScreen.start();
    }
}
exports.default = MainController;
