import Canvaser from './Canvaser';
import Penguin from './Penguin';

export default class Arena
{
    private penguins: Penguin[] = [];
    private canvaser: Canvaser;

    public constructor()
    {
        this.canvaser = new Canvaser(
            'canvas-arena',
            window.innerWidth,
            400,
        );
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
        this.penguins.sort((p1, p2) =>
        { 
            return (p1.y - p2.y);
        });
        this.penguins.forEach(penguin => {
            penguin.draw();
        });
    }
}