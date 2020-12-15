import Canvaser from './Canvaser';
import Penguin from './Penguin';

export default class Arena
{
    private penguins: Penguin[] = [];
    private canvaser: Canvaser;

    public constructor()
    {
        this.canvaser = new Canvaser(
            'arenaCavnas',
            800,
            800,
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
        this.penguins.forEach(penguin => {
            penguin.draw();
        });
    }
}