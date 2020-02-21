import * as PIXI from "pixi.js";

export class ResourceManager {

    private readonly _loader: PIXI.Loader;

    private readonly _cache: { [key: string]: any } = {};

    public constructor() {
        this._loader = PIXI.Loader.shared;
    }

    public add(name: string, url: string): ResourceManager {
        this._loader.add(name, url);
        return this;
    }

    public load(onComplete: () => void): void {
        this._loader.on("complete", onComplete);
        this._loader.load();
    }

    public getTexture(name: string): PIXI.Texture {
        if (!this._cache.hasOwnProperty(name)) {
            this._cache[name] = new PIXI.Texture(PIXI.Texture.from(name).baseTexture);
            console.log(`${name} was not in the cache. It is now!`);
        }

        return this._cache[name] as PIXI.Texture;
    }

    public hasTexture(name: string): boolean {
        return this._cache.hasOwnProperty(name);
    }

    public addTexture(name: string, texture: PIXI.Texture) {
        this._cache[name] = texture;
    }
}