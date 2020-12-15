import Arena from './Arena';

export default class Game
{
    private arena: Arena;
    private good: HTMLElement;
    private bad: HTMLElement;
    private spawnCooldown: number = 0;

    constructor()
    {   
        this.good = document.getElementById('good');
        this.bad = document.getElementById('bad');
        this.arena = new Arena();

        this.bad.addEventListener("click", () =>{
            console.log("Bad");            
        })

        this.good.addEventListener("click", () =>{
            console.log("Good");            
        })
        
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
