import * as PIXI from 'pixi.js';
import { ResourceManager } from './ResourceManager';
import { StateManager } from './fsm/StateManager';

export class Game {
    
    private readonly _app: PIXI.Application;
    private readonly _width: number;
    private readonly _height: number;
    private _updateLoop: (n: number) => void;

    private readonly _resourceManger: ResourceManager = new ResourceManager();
    public get resourceManager(): ResourceManager {
        return this._resourceManger;
    }

    private readonly _stateManager: StateManager;
    public get stateManager(): StateManager {
        return this._stateManager;
    }

    public constructor(width: number, height: number, backgroundColor: number = 0x0) {
        this._app = new PIXI.Application({
            width,
            height,
            backgroundColor
        });

        this._width = width;
        this._height = height;

        document.body.appendChild(this._app.view);

        this._app.renderer.resize(window.innerWidth, window.innerHeight);
        this._app.stage.scale.x = window.innerWidth / this._width;
        this._app.stage.scale.y = window.innerHeight / this._height;

        this._stateManager = new StateManager(this);

        window.addEventListener("resize", this.onResize.bind(this));
    }

    public run(): void {
        this._updateLoop = (delta: number) => {
            this._stateManager.update(this._app.ticker.elapsedMS / 1000.0);
        };

        this._app!.ticker.add(this._updateLoop);
    }

    public stop(): void {
        if (this._updateLoop) {
            this._app.ticker.remove(this._updateLoop);
        }
    }

    private onResize(): void {
        if (!this._app) {
            return;
        }

        this._app.renderer.resize(window.innerWidth, window.innerHeight);
        this._app.stage.scale.x = window.innerWidth / this._width;
        this._app.stage.scale.y = window.innerHeight / this._height;
    }
}