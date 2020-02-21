export abstract class BaseState {
    public abstract update(deltaTime: number): void;

    public abstract enter(): void;
    
    public abstract exit(): void;
}