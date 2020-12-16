import Arena from './Arena';
import Eventlistener from './Eventlistener'

export default class Game
{
    private arena: Arena;
    private event: Eventlistener;
    private spawnCooldown: number = 0;

    constructor()
    {   
        this.arena = new Arena();
        this.event = new Eventlistener();
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
