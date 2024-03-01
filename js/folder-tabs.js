class FolderTabs {
    constructor() {

        this.folder = new FolderView();
        this.tab = new TabView();
        this.run();
        this.selectCopyItem = null;
    }
    static clickTabs(connect = true) {
        if (connect) {
            FolderTabs.clickItemFolder.call(
                document.querySelector(`#view-folder li[file-name="${$(this).attr('file-name')}"]`),
                false)
        }

        if ($(this).hasClass('active')) { return }
        let b = $("div#tabs div.tab.active");
        if (b.length) { b.toggleClass("active") };
        $(this).addClass("active");
    }
    static clickItemFolder(connect = true) {
        if (connect) {
            let file_name = $(this).attr('file-name');
            if (file_name != undefined) {
                FolderTabs.clickTabs.apply(
                    document.querySelector(`div.tabs > div.tab[file-name="${file_name}"]`),
                    [false])
            }

        }
        if ($(this).hasClass('active')) { return }
        let b = $("#view-folder .active");
        if (b.length) { b.toggleClass("active") };
        $(this).addClass("active");
    }
    static checkItem(name) {
        if (name.endsWith('.mty')) { return { cls: 'tab-mty', icon: 'flash' } }
        if (name.endsWith('.js')) { return { cls: 'tab-js', icon: 'logo-nodejs' } }
        if (name.endsWith('.html')) { return { cls: 'tab-html', icon: 'code-sharp' } }
        if (name.endsWith('.css')) { return { cls: 'tab-css', icon: 'logo-css3' } }
        return { cls: '', icon: 'scan' };
    }
    run() {
        // this.folder.add(
        //         {
        //             "folder-1":
        //                 ['code.js','maim.html','style.css',{
        //                     "folder-2":['code.js','maim.html','style.css',{
        //                         'folder-3':['code.js','maim.html','style.css']
        //                     }]
        //                 }] ,
        //             "folder-3":['code.js','maim.html','style.css'] ,
        //             "folder-4":['code.js','maim.html','style.css'] ,
        //             "folder-5":['code.js','maim.html','style.css'] ,
        //         }
        //     )

    }
}
class TabView {
    constructor() {
        this.box = $("#tabs");
        this.box.sortable({ axis: 'x', cancel: '.folder-botton', items: '.tab' });
    }
    creat(file_id, name) {
        this.box.find(".active").removeClass("active");
        let c = FolderTabs.checkItem(name);
        let e = $(`<div file_id="${file_id}" class="tab active">
                <i class="${c.cls}"><ion-icon name="${c.icon}"></ion-icon></i>
                <h3>${name}</h3>
                <button type="button"><ion-icon name="close-sharp"></ion-icon></button>
            </div>`);
        this.box.append(e);
        this.setFunc(e);
        return e;
    }
    setFunc(tab) {
        tab.click(() => { this.click(tab) })
        tab.find("button").click(() => { this.close(tab) })
    }
    click(tab) {
        if (tab.hasClass("active")) { return }
        this.box.find(".active").removeClass("active");
        tab.addClass("active");
        let file_id = tab.attr("file_id")
        // _.src_file.selectFile(file_id);
        _.folderTabs.folder.selectFile(file_id);
    }
    close(tab) {
        if (tab.find("button").hasClass("change")) { return this.closeQuestion(tab) }
        let file_id = tab.attr("file_id");
        let siblings = tab.siblings('.tab');
        tab.remove();
        _.src_file.removeFile(file_id);
        _.folderTabs.folder.removeFileId(file_id);
        if (siblings.length) {
            $(siblings[siblings.length - 1]).click();
        }
    }
    closeQuestion(tab) {
        
    }
    selectTab(file_id) {
        let tab = this.box.find(`.tab[file_id="${file_id}"]`);
        if (tab.hasClass("active")) { return };
        this.box.find(".active").removeClass("active");
        tab.addClass("active");
    }
    onChangeFile(file_id) {
        this.box.find(`div[file_id="${file_id}"] button`).addClass('change')
    }
}

class FolderView {
    constructor() {
        this.box = $("#view-folder");
        $("#opon-folder").click($.proxy(function (box) { box.toggleClass("active") }, null, this.box));
        this.box.click(this.viewFolder)
        this.box.find(".options-folder li").click($.proxy(this.mangeOptions, null, this))
        // this.box.sortable({items:".folder-item",connectWith:".folder-box",appendTo:'.folder-items'})
        this.selected = null;
        this.pattern = /(\)|\(|\*|×|٪|!|`|~|\?|<|>|,|'|;|\/\/|\s|\\|\/)/;
    }
    viewFolder(e) {
        if (e.target.id == "view-folder") { $(this).find(".active").removeClass("active") }
        return this;
    }
    mangeOptions(t) {
        let mode = $(this).attr("func");
        switch (mode) {
            case "newFolder": { t.startNewFolder(); break };
            case "newFile": { t.startNewFile(); break };
            case "delete": { t.deleteItem(); break };
            case "edite": { t.edite(); break };
            case "copy": { t.copyItem(); break };
            case "paste": { t.pasteItem(); break };
            case "help": { t.help(); break };

            default: { alert(mode); break }
        }
    }
    deleteItem() {
        let e = $("#view-folder .active");
        if (e.length) {
            if (e.hasClass('name')) {
                e.parent().remove()
            }
            else {
                e.remove()
            }
        }
    }
    copyItem() {
        let e = this.box.find(".active");
        if (e.length) {
            let m;
            if (e.hasClass("name")) { this.selectCopyItem = e.parent().clone(); m = 'Folder' }
            else { this.selectCopyItem = e.clone(); m = 'File' }
            return _.notif.add({ mode: "info", text: `Copy ${m} !` });
        }
        return;
    }
    pasteItem() {
        let e = this.box.find(".active");
        let item_list
        if (e.length) {
            if (e.hasClass("name")) {
                item_list = e.next()
            }
            else {
                item_list = e.parent()
            }
        }
        else {
            item_list = this.box
        }
        item_list.append(this.selectCopyItem)
    }
    help() {
        _.notif.add({ mode: "success", text: `success` });
        _.notif.add({ mode: "info", text: `info`, msg: "mahdi shabani alishah" });
        _.notif.add({ mode: "warnig", text: `warnig`, msg: "mahdi shabani alishah" });
        _.notif.add({ mode: "danger", text: `danger` });
    }
    selectFile(file_id) {
        this.box.find(`li[file_id="${file_id}"]`).click();
    }
    removeFileId(file_id) {
        this.box.find(`li[file_id="${file_id}"]`).removeAttr("file_id");
    }
    add(data = {}, url) {
        url = url.split('/').slice(0, -2).join('/') + '/';
        return this.folder(data, this.box, url)
    }
    folder(obj, parent, url) {
        let i, last;
        for (i in obj) {
            let nf = this.newFoder(i, url);
            last = parent.find("> .folder-box:last-child");
            if (parent == this.box) { parent.append(nf); }
            else {
                if (last.length) { last.after(nf) }
                else { parent.prepend(nf) }
            }
            this.items(obj[i], nf.find(".folder-items"), url + i + '/')
        }
    }
    newFoder(name, url) {
        return this.folderFunc($(`
        <div class="folder-box"  folder-name="${name}" action="${url + name}/">
            <li class="name" draggable="true"><i><ion-icon name="chevron-forward"></ion-icon></i><h3>${name}</h3></li>
            
            <div class="folder-items">
            </div>
        </div>
        `));
    }
    folderFunc(folder) {
        folder.find(".name").click($.proxy(nameClick, null, this))
        function nameClick(cls) {
            folder.toggleClass('show');
            let t = $(this);
            if (t.hasClass("active")) { return }
            cls.box.find(".active").removeClass("active")
            return t.addClass("active");
        }
        folder.find(".name").on('dragstart', $.proxy(this.dragStartItemFolder, this))
        folder.on('dragover', this.dragOver)
        folder.on('drop', $.proxy(this.dropInFolder, this))
        folder.on('drop', $.proxy(this.dropInFolder, null, this))
        return folder;
    }
    items(arr, boxItems, url) {
        let i
        for (i of arr) {
            if (i instanceof Object) { this.folder(i, boxItems, url) }
            else { boxItems.append(this.newElementItem(i, url)) }
        }
    }
    newElementItem(name, url) {
        let c = FolderTabs.checkItem(name);
        let e = $(`
        <li class="folder-item" file-name="${name}"  draggable="true" action="${url + name}">
            <i class="${c.cls}"><ion-icon name="${c.icon}"></ion-icon></i>
            <h4>${name}</h4>
        </li>
        `);
        this.itemFunc(e);
        return e;
    }
    itemFunc(item) {
        item.click($.proxy(nameClick, null, this))
        function nameClick(cls) {
            let t = $(this);
            cls.getDataItem(t);
            if (t.hasClass("active")) { return }
            cls.box.find(".active").removeClass("active")
            return t.addClass("active");
        }
        item.on('dragstart', $.proxy(this.dragStartItemFolder, this))
    }
    getDataItem(t) {
        let file_id = t.attr('file_id');
        if (file_id) {
            _.folderTabs.tab.selectTab(file_id);
            return _.src_file.selectFile(file_id);
        }
        else { return _.src_file.getSrcAndCreat(t) }
    }
    dragStartItemFolder(e) {
        if (e.target.classList.contains('name')) { this.selected = e.target.parentElement; }
        else { this.selected = e.target; }
        return;
    }
    dropInFolder(t) {
        if (t.selected == null) { return }
        try {
            this.children[1].appendChild(t.selected);
            t.selected = null;
        }
        catch { return }
    }
    dragOver(e) {
        e.preventDefault();
    }

    startNewFolder() {
        let newFolder = $(`
        <li id="newFolder" class="new-file-creat active">
            <i>
                <ion-icon name="folder"></ion-icon>
            </i>
            <input type="text">
        </li>
        `);
        this.appnedNewFF(newFolder)
        this.inputCheckType(newFolder);
        this.inputBlur(newFolder);
    }
    startNewFile() {
        let newFile = $(`
        <li id="newFile"  class="new-file-creat active">
            <i>
                <ion-icon name="scan"></ion-icon>
            </i>
            <input type="text">
        </li>
        `);
        this.appnedNewFF(newFile)
        this.inputCheckType(newFile);
        this.inputBlur(newFile);
        return;
    }
    appnedNewFF(elment) {
        this.box.find('.new-file-creat').remove();
        let folder = this.box.find(".folder-items > .active")
        if (folder.length) { folder = folder.parent() }
        else {
            folder = this.box.find(".folder-box > li.name.active");
            if (folder.length) { folder = folder.next() }
            else { folder = this.box }
        }
        folder.append(elment);//.eq(0)
        folder.find("input").focus();
    }
    inputCheckType(elmnt) {
        let id, i, icon, input, cls;
        id = elmnt.attr('id');
        i = elmnt.find("i");
        icon = elmnt.find("ion-icon");
        input = elmnt.find("input");
        cls = this;
        input.on('keyup', keyup);
        function keyup(e) {
            if (e.keyCode == 13) { return $(input).blur() }
            let t = input.val();
            if (cls.pattern.test(t)) {
                input.css({ color: "#f00" });
                if (id == "newFile") {
                    i.removeAttr('class');
                    icon.attr({ 'name': 'scan' })
                }
                return;
            }
            else { input.css({ color: "#ddd" }) }

            let dobl;
            if (id == "newFile") { dobl = elmnt.parent().find(`li[file-name="${t}"]`); }
            else { dobl = elmnt.parent().find(`div[folder-name="${t}"]`) }
            if (dobl.length) { return input.css({ color: "#f00" }); }

            if (id == "newFile") {
                if (t.endsWith(".mty")) { i.attr({ 'class': 'tab-mty' }); return icon.attr({ 'name': 'flash' }); }
                if (t.endsWith(".js")) { i.attr({ 'class': 'tab-js' }); return icon.attr({ 'name': 'logo-nodejs' }); }
                if (t.endsWith(".html")) { i.attr({ 'class': 'tab-html' }); return icon.attr({ 'name': 'code-sharp' }); }
                if (t.endsWith(".css")) { i.attr({ 'class': 'tab-css' });; return icon.attr({ 'name': 'logo-css3' }); }
                i.removeAttr('class');
                return icon.attr({ 'name': 'scan' });
            }
            return;
        }

    }
    inputBlur(elmnt) {
        let id, i, icon, input, cls;
        id = elmnt.attr('id');
        i = elmnt.find("i");
        icon = elmnt.find("ion-icon");
        input = elmnt.find("input");
        cls = this;
        input.on('blur', blur);
        function blur() {
            let item, name, parent;
            name = input.val();
            parent = elmnt.parent();
            if (cls.pattern.test(name)) { return };
            if (id == "newFile") {
                if (!name) {
                    if (!elmnt.attr('file_id')) {
                        return elmnt.remove();
                    }
                    return;
                }
                if (parent.find(`li[file-name="${name}"]`).length) { return input.css({ color: "#f00" }); }
                item = cls.newElementItem(name, i.attr('class'), icon.attr('name'))
                console.log('creat backend file')
            }
            else {
                if (!name) {
                    if (!elmnt.attr('folder_id')) {
                        return elmnt.remove();
                    }
                    return;
                }
                if (parent.find(`div[folder-name="${name}"]`).length) { return input.css({ color: "#f00" }); }
                item = cls.newFoder(name);
                console.log('creat backend foldr')
            }
            elmnt.remove()
            parent.append(item)
            item.click();
            return;
        }
    }
    edite() {
        let e = this.box.find(".active");
        if (!e.length) { return }
        let cls = this;
        let input, i, icon, hName, file, iName, iClass, parent;
        parent = e.parent();
        if (e.hasClass('name')) {
            hName = e.find("h3");
            input = $(`<input class="edit-inline-iteme" type="text" id="editFolderName">`);
            file = false;
        }
        else {
            input = $(`<input class="edit-inline-iteme" type="text" id="editFileName">`);
            hName = e.find("h4");
            i = e.find("i");
            iClass = i.attr("class");
            icon = i.find('ion-icon');
            iName = icon.attr('name');
            file = true;
        }
        input.on(
            {
                'keyup': function (e) {
                    if (e.keyCode == 13) { return $(this).blur() }
                    let t = input.val();
                    if (cls.pattern.test(t)) {
                        input.css({ color: "#f00" });
                        return;
                    }
                    else { input.css({ color: "#ddd" }) }

                    let dobl;
                    if (file) { dobl = parent.find(`li[file-name="${t}"]`); }
                    else { dobl = parent.parent().find(`div[folder-name="${t}"]`) }
                    if (dobl.length) { return input.css({ color: "#f00" }); }

                    if (file) {
                        if (t.endsWith(".mty")) { i.attr({ 'class': 'tab-mty' }); return icon.attr({ 'name': 'flash' }); }
                        if (t.endsWith(".js")) { i.attr({ 'class': 'tab-js' }); return icon.attr({ 'name': 'logo-nodejs' }); }
                        if (t.endsWith(".html")) { i.attr({ 'class': 'tab-html' }); return icon.attr({ 'name': 'code-sharp' }); }
                        if (t.endsWith(".css")) { i.attr({ 'class': 'tab-css' });; return icon.attr({ 'name': 'logo-css3' }); }
                        i.removeAttr('class');
                        icon.attr({ 'name': 'scan' });
                        return;
                    }
                    return;
                },
                'blur': function () {
                    let name = input.val();
                    let dobl;
                    if (file) { dobl = parent.find(`li[file-name="${name}"]`); }
                    else { dobl = parent.parent().find(`div[folder-name="${name}"]`); }
                    if (cls.pattern.test(name) || !name || dobl.length) {
                        $(this).remove();
                        hName.show();
                        if (file) {
                            i.attr('class', iClass);
                            icon.attr('name', iName)
                        }
                        return;
                    }
                    hName.text(input.val());
                    hName.show();
                    if (file) { e.attr("file-name", input.val()) }
                    else { parent.attr("folder-name", input.val()) }

                    return input.remove();
                }
            })
        input.val(hName.text());
        hName.hide();
        e.append(input);
        input.focus();
    }
}