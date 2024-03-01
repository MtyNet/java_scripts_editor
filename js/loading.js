class DataRain
{
    constructor(parent ,contianer ,bacground=null)
    {
        this.contianer = contianer.append(bacground) ? bacground : contianer;
        this.contianer.append(this.dataRain());
        this.parent = $(parent);
        this.cloud = this.contianer.find('.cloud');
        this.interval;
    }
    dataRain()
    {
        return $(`<div id="data-rain">
                    <div class="cloud">
                        <h2>Get Data Clouds</h2>
                    </div>
                </div>`);
    }
    randomText(){
        var text = ("!@#$%^&()_+-<>?/|\\[]{}");
        let letters = text[Math.floor(Math.random() * text.length)]
        return letters;
    }
    rain(){
        let e = $(`<div class="drap" style="
                        left: ${Math.floor(Math.random() *300)}px; 
                        font-size: ${0.5 + (Math.random() * 1.5)}em; 
                        animation-duration: ${1 + (Math.random() * 1)}s;">
                            ${this.randomText()}
                        </div>`);
        this.cloud.append(e);
        
        
        setTimeout(function() {
            e.remove();
        }, 2000);
    }
    
    start()
    {
        this.parent.append(this.contianer);
        this.interval = setInterval(()=>{
            this.rain();
        },20)
        return;
        
    }
    close()
    {
        clearInterval(this.interval);
        this.contianer.fadeOut(2000 ,()=>{
            this.contianer.remove()
        });
    }
}

class Loading
{
    constructor()
    {

    }
    contianer()
    {
        return $(`<div class="continer-loading"></div>`)
    }
    line()
    {
        let c;
        c = this.contianer();
        c.append(`<div class="loading"></div>`);
        return c;
    }
    bacgroundShadow()
    {
        return $(`<div class="loading-shadow"></div>`);
    }
    
    dataRain(parent_selector)
    {
        let cls = new DataRain(parent_selector ,this.contianer() ,this.bacgroundShadow());
        return cls;
    }
    

}
// $(document).ready(function () {
//     let e = new Loading().dataRain("div.SourceCode #source-code");
//     e.start()
//     setTimeout(function() {
//         e.close();
//     }, 10000);
// });