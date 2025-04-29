import Database from "../db/Database";
import MainScreen from "../view/MainScreen";
import ArtController from "./ArtController";
import ArtistController from "./ArtistController";
import ExhibitionController from "./ExhibitionController";

export default class MainController {
    private db: Database = new Database();
    public artController: ArtController = new ArtController(this.db);
    public artistController: ArtistController = new ArtistController(this.db);
    public exhibitionController: ExhibitionController = new ExhibitionController(this.db);
    private mainScreen: MainScreen;

    constructor() {
        this.mainScreen = new MainScreen(this);
    }

    public start(): void {
        this.mainScreen.start();
    }
}