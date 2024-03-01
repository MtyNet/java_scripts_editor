// export default class ReSize
class ReSize {
    //__init__
    constructor() {
        this.row = document.querySelector('.container');
        this.button = document.querySelector(".ReSize");
        this.button.onmousedown = () => { this.initReSize() };
        this.button.addEventListener('touchstart', this.onTouchDown, { passive: true });
        return;
    }
    initReSize() {
        // document.onmousemove = (event)=>{this.onMove(event)};
        // document.onmouseup = ()=>{this.onUp()};
        // this.button.onmouseup = ()=>{this.onUp()};

        window.onmousemove = (event) => { this.onMove(event) };
        window.onmouseup = () => { this.onUp() };
        this.button.onmouseup = () => { this.onUp() };
        $(this.button).addClass("active")
        return;
    }
    onTouchDown(e) {
        ;
        function onTouchMove(e) {
            e.preventDefault()
            let c = document.querySelector('.container');
            e = e.touches[0] || e.changedTouches[0];
            if (window.innerHeight - 10 < e.clientY) { return }
            else { c.style.height = e.clientY; return; }
        }
        document.addEventListener('touchmove', onTouchMove, { passive: false });

        function onTouchEnd() {
            document.removeEventListener('touchmove', onTouchMove, { passive: false });
            document.removeEventListener('touchend', onTouchEnd, { passive: true });
        }
        document.addEventListener('touchend', onTouchEnd, { passive: true });
        return;
    }
    onUp() {
        // document.onmousemove = null;
        // this.button.onmouseup = null;
        // document.onmouseup = null;
        window.onmousemove = null;
        this.button.onmouseup = null;
        window.onmouseup = null;
        $(this.button).removeClass("active")
        return;
    }
    onMove(e) {
        if (document.body.classList.contains("vertical")) {
            if (this.row.offsetWidth - 100 < e.clientX) { return }
            if (e.clientX < 100) { return }
            let s = (e.clientX) / (this.row.offsetWidth) * 100
            this.row.style.gridTemplateColumns = `calc(${s}% - 5px) 10px calc(${100 - s}% - 5px)`;
            this.row.style.gridTemplateRows = '';
            return;
        }
        else {
            if (this.row.offsetHeight - 100 < e.clientY) { return }
            if (e.clientY < 100) { return }
            let s = (e.clientY) / (this.row.offsetHeight) * 100
            this.row.style.gridTemplateRows = `40px calc(${s}% - 25px) 10px calc(${100 - s}% - 25px)`;
            this.row.style.gridTemplateColumns = '';
            return;
        }

    }
    verticalMode() {
        this.row.style = '';
        $("body").toggleClass("vertical");
    }
    viewsMode() {
        this.row.style = '';
        $("body").toggleClass("viewsMode");
    }
}
// export default ReSize;
// export {ReSize};
class ReSize_ {
    constructor({ parent = null, btn = null, postion = "top", mode = "X", data = {} }) {
        console.log(parent, btn, postion, mode, data )
        let b = $(`<div class="BtnResize"></div>`);
        if (parent && !btn) {
            this.parent = $(parent);
            this.parent.append(b)
            this.btn = b;
        } else if (btn && !parent) {
            $(btn).append(b);
            this.btn = b;
            this.btn.addClass("full-btn")
        }
        this.data = data;
        this.postion = postion;
        this.mode = mode;
        this.data.start = (event) => { console.log('start') };
        this.data.move = (event) => { console.log("X: " + event.clientX + ", Y: " + event.clientY) };
        this.data.end = (event) => { console.log('end') };
        this.onCreat();
    }
    onCreat() {
        let mode;
        if (['x', 'X'].includes(this.mode)) { mode = 'Horizontal' }
        else { mode = 'vertical' }
        this.btn.addClass([this.postion, mode]);
        this.btn.on("mousedown", (event) => {
            this.btn.addClass("select");
            this.data.start(event);
            $(window).on("mousemove", this.data.move)
            $(window).one("mouseup", (event) => {
                $(window).off("mousemove")
                this.btn.removeClass("select");
                this.data.end(event);
                return;
            })
            return;
        })
    }
    Func(key, value) {
        let type = typeof key;
        if (type === "string" && value) {
            if (typeof value === "function") {
                value = value.bind(this)
            }
            this.data[key] = value;
            return;
        }
        if (type === "string" && !value) {
            return this.data[key];
        }
        if (type === "object") {
            // this.data = {...key ,...this.data}
            for (let i in key) {
                this.Func(i, key[i])
            }
            return;
        }
        return;
    }
}

$(document).ready(function () {
    setTimeout(() => {
        let e = new ReSize_({ btn: ".container > .ReSize", postion: "left", mode: "Y", 
            data:{
                container: $("body > .container")
        }})
        e.Func({
            move: function (e) {
                if (document.body.classList.contains("vertical")) {
                    if (this.data.container[0].offsetWidth - 100 < e.clientX) { return }
                    if (e.clientX < 100) { return }
                    let s = (e.clientX) / (this.data.container[0].offsetWidth) * 100;
                    this.data.container.css({
                        gridTemplateColumns: `calc(${s}% - 5px) 10px calc(${100 - s}% - 5px)`,
                        gridTemplateRows: ``,
                    })
                    return;
                }
                else {
                    if (this.data.container[0].offsetHeight - 100 < e.clientY) { return }
                    if (e.clientY < 100) { return }
                    let s = (e.clientY) / (this.data.container[0].offsetHeight) * 100
                    this.data.container.css({
                        gridTemplateRows: `40px calc(${s}% - 25px) 10px calc(${100 - s}% - 25px)`,
                        gridTemplateColumns: '',
                    })
                    return;
                }
            }
        })


        // let e = new ReSize_({ continerResize: "#difalt_screen", postion: "bottom", mode: "x" })
        // e.Func("move" ,function(event){
        //     let box = this.continerResize
        //     let p = box.offset();
        //     box.css('max-height' ,(event.clientY - p.top)+"px ");
        //     box.offset(); // مختصات نسبت به صفحه وب
        //     box.position(); // مختصات نسبت به عنصر پدر
        //     box.outerHeight(); // ارتفاع عنصر با در نظر گرفتن padding و border
        //     box.outerWidth(); // عرض عنصر با در نظر گرفتن padding و border
        // })
    }, 2000)

});