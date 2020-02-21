import { BaseState } from './BaseState';
import { Game } from '../Game';

export class StateManager {
    private _currentState: BaseState | undefined;
    
    private readonly _states: Map<string, BaseState> = new Map<string, BaseState>();

    private readonly _game: Game;
    public get game(): Game {
        return this._game;
    }

    public constructor(game: Game) {
        this._game = game;
    }

    public changeTo(name: string): void {
        if (!this._states.has(name)) {
            console.log(`MISSING STATE '${name}'`);
            return;
        }

        if (this._currentState) {
            this._currentState.exit();
        }

        this._currentState = this._states.get(name);
        if (this._currentState) {
            this._currentState.enter();
        }
    }

    public add(name: string, state: BaseState): void {
        this._states.set(name, state);
    }

    public update(deltaTime: number): void {
        if (this._currentState) {
            this._currentState.update(deltaTime);
        }
    }
}
