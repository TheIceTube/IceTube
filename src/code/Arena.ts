import Canvaser from './Canvaser';
import Penguin from './Penguin';

export default class Arena
{
    private penguins: Penguin[] = [];
    private canvaser: Canvaser;

    public drawShadow: boolean = false;

    private sortCooldown: number = 0;

    public constructor()
    {
        this.canvaser = new Canvaser(
            'canvas-arena',
            window.innerWidth,
            400,
        );

        window.addEventListener('click', () =>
        { 
            this.drawShadow = !this.drawShadow;
        });
        
    }
    

    public addPenguin ()
    {
        this.penguins.push(new Penguin(this.canvaser));
    }

    public moveAll ()
    {
        this.penguins.forEach(penguin => {
            penguin.move();
        });
    }

    public draw ()
    {
        this.canvaser.clear();

        if (this.sortCooldown-- <= 0)
        {
            this.sortCooldown = 8;
            this.penguins.sort((p1, p2) =>
            { 
                return (p1.y - p2.y);
            });
        }
        
        this.penguins.forEach(penguin => {
            penguin.draw(this.drawShadow);
        });

        console.log(this.penguins.length);
    }
}