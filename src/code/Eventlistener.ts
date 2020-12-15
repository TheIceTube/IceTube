export default class Eventlistener {

    private good: HTMLElement;
    private bad: HTMLElement;
    private screen: HTMLElement;

    constructor () {

        this.good = document.getElementById('good');
        this.bad = document.getElementById('bad');

        this.chekc();
    } 

    public chekc = () =>{
        this.bad.addEventListener("click", () =>{
            console.log("Bad");            
        })

        this.good.addEventListener("click", () =>{
            console.log("Good");            
        })
    } 

} 