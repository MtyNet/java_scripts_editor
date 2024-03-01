class FlieDialogs {
    constructor(project_manger, url_action) {
        this.container = $('<div id="FlieDialogs"></div>');
        this.url_action = url_action;
        this.position = "body";
        this.project_manger = project_manger;
        this.onStart()
    }
    onStart() {
        $(this.position).append(this.container);
        this.container.append(this.Box());
        this.setOption();
        this.getPkg(this.box.find(".folder-pkg").attr("action"))
        // this.setFunc()
        return;
    }
    open() {
        if (this.container.find(".dialog-window").length) {
            $(this.position).append(this.container);
            this.setOption();
            let t = this;
            this.box.find(".pkg-item").click(function () {
                let elmnt = $(this);
                elmnt.siblings('.active').removeClass("active");
                if (elmnt.find('.pkg-name').siblings().length == 0) {
                    elmnt.append('<div class="load"></div>');
                    t.getPkgInfo(elmnt.attr("action"));

                }
                elmnt.toggleClass("active")
            })
            return
        }
        return this.onStart();
    }
    close() {
        this.container.remove()
    }
    setOption() {
        this.box.find(".dialog-closed").click(() => { this.close() })
        this.container.click((event) => {
            if (event.target.id != "FlieDialogs") { return }
            this.close()
        })
        this.box.find("#CreatNewPakge").click(() => { this.CreatNewPakge() })
        this.box.find("#LoadSource").click(() => { this.LoadSource() })
    }
    getPkg(url) {
        $.ajax({
            type: "get",
            url: url,
            data: {},
            dataType: "text",
            success: (response) => {
                this.setItemDialog(JSON.parse(response));
                return
            },
            error: function (xhr, status, error) {
                console.log(status + error)
                return;
            }
        });
    }
    setItemDialog(data) {
        for (let [key, value] of Object.entries(data)) {
            // console.log(key + ": " + value); 
            let e = this.creatPkgItem(key)
        }
        return;
    }
    Box() {
        this.box = $(`
        <div class="dialog-window">
            <div class="header-dialog">
                <div class="name">mty</div>
                <input class="dialog-closed" type="button" value="X">
            </div>
            <div class="folder-pkg" action="${this.url_action}">

            </div>
            <div class="button-dialog">
                <input id="CreatNewPakge" type="button" value="Creat New Pakge">
                <input id="LoadSource" type="button" value="Load Source">
            </div>
        </div>
        `);
        return this.box;
    }
    setFunc(elmnt) {
        let t = this;
        elmnt.on("click", function () {
            elmnt.siblings('.active').removeClass("active");
            if (elmnt.find('.pkg-name').siblings().length == 0) {
                elmnt.append('<div class="load"></div>');
                t.getPkgInfo(elmnt.attr("action"));

            }
            elmnt.toggleClass("active")
        })
    }
    setPkgInfo(data) {
        let pkg = this.box.find(`[action="${data.url}"]`);
        if (data.img) {
            pkg.append(this.addImg(data.img));
        }
        if (data.readme) {
            pkg.append(this.addReadme(data.readme));
        }
        pkg.find(".load").remove()
        pkg.attr('data', `${JSON.stringify(data.items)}`)
    }
    getPkgInfo(url) {
        let data = {
            "url": url,
        }
        // org 
        $.ajax({
            type: "get",
            url: url,
            // data: {},
            dataType: "text",
            success: (response) => {
                data['items'] = JSON.parse(response);
                if ("this.png" in data['items']) {
                    data["img"] = url + "this.png";
                }
                if ("this.text" in data['items']) {
                    $.ajax({
                        type: "get",
                        url: url + "this.text",
                        data: {},
                        dataType: "text",
                        success: (response) => {
                            data['readme'] = response;
                            return this.setPkgInfo(data);
                        },
                        error: function (xhr, status, error) {
                            console.log(status + " => " + error)
                            data['readme'] = null;
                            return this.setPkgInfo(data);
                        }
                    });
                } else {
                    return this.setPkgInfo(data);
                }

                return;
            },
            error: function (xhr, status, error) {
                console.log(status + error)
                return;
            }
        });
    }
    creatPkgItem(name) {
        let e = $(`<div class="pkg-item" action="">
                    <div class="pkg-name">${name}</div>
                </div>`);
        this.setFunc(e)
        this.box.find(".folder-pkg").append(e);
        e.attr("action", e.parent().attr("action") + name)
        return e;
    }
    addReadme(text) {
        return `<div class="readme">${text}</div>`;
    }
    addImg(url) {
        return `<div class="pic" style="background-image: url(${url});"></div>`
    }
    LoadSource() {
        let pkg, url, data;
        pkg = this.box.find(".pkg-item.active");
        url = pkg.attr("action");
        // data = JSON.parse(pkg.attr("data"));
        this.project_manger.selectPkgLoadSource(url, data);
    }
}

class QuestionDialog {
    constructor(parent ,title="Question Box" ,buttons = {} ,msg=null) {
        /*
        buttons = {"name" : function() , ...}
        */
        this.parent = parent;
        this.title = title;
        this.msg = msg;
        this.buttons = buttons;
        this.container
    }
    addButton(name ,func) {
        this.buttons[name] = func;
        return;
    }
    open() {

    }
    close()
    {

    }
}
$(document).ready(function () {
    new QuestionDialog(
        parent = "body",
        title = "Question Box",
        buttons = {
            "btn1":()=>{console.log("btn1")} ,
            "btn2":function(){console.log("btn1")}
         } ,
        msg = "test msg for dialog question"
    )
});
