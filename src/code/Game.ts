import Arena from './Arena';

export default class Game
{
    private arena: Arena;

    private spawnCooldown: number = 0;

    constructor()
    {
        this.arena = new Arena();
        requestAnimationFrame(this.loop);
    }

    private loop =  () =>
    {
        requestAnimationFrame(this.loop);

        if (this.spawnCooldown-- <= 0)
        {
            this.spawnCooldown = 1;
            this.arena.addPenguin();
        }

        this.arena.moveAll();
        this.arena.draw();
    }

}
