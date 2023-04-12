class DoomFire {

    constructor(width, height) {
        this.canvas = document.querySelector('#canvasFire');
        this.width = width/4;
        this.height = height/4;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.firePixels = [];
        this.fireColors = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];
        this.ctx.scale(4, 4);
    }

    start() {
        this.startStructure();
        this.fireSource();
        this.render();
        this.loop();
    }

    propagareFire() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let ind = i + (this.width * j);
                this.updatePixelIntensity(ind);
            }
        }
        this.render();
    }

    updatePixelIntensity(pixelIndex){
        let belowIndPixel = pixelIndex + this.width;
        if(belowIndPixel >= this.width * this.height) return;
        let decay = Math.floor(Math.random()*3);
        let belowIntensity = this.firePixels[belowIndPixel];
        let newIntensity = belowIntensity - decay;
        this.firePixels[pixelIndex - decay] = newIntensity >= 0 ? newIntensity: 0;
    }

    startStructure() {
        let totalPixels = this.width * this.height;
        for (let i = 0; i < totalPixels; i++) {
            this.firePixels[i] = 0;
        }
    }

    render() {
        this.ctx.clearRect(0,0, this.width, this.height);
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let ind = j + (this.width * i);
                let colorItem = this.fireColors[this.firePixels[ind]];
                this.ctx.fillStyle = `rgb(${colorItem.r},${colorItem.g},${colorItem.b})`;
                this.ctx.fillRect(j, i, 1, 1);
            }
        }
    }

    fireSource(){
        for(let i = 0; i < this.width; i++){
            let overflow = this.width * this.height;
            let pixelIndex = (overflow - this.width) + i;
            this.firePixels[pixelIndex] = 36;
        }
    }

    loop(){
        this.propagareFire();
        window.requestAnimationFrame(this.loop.bind(this));
    }

}

var doomFire = new DoomFire(900, 600);

doomFire.start();