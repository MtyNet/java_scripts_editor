class SourceCode {
    constructor() {
        this.theme = 'dracula';
        // this.editors = {};
        this.body = $('#source-code');
        this.dont_key = [27, 192, 9, 20, 91, 18, 93, 17, 37, 40,
            39, 38, 144, 19, 33, 34, 35, 36, 45, 46, 145, 16, 123, 121,
            120, 119, 118, 117, 115, 114, 113, 112, 116];
        this.run()
    }
    test() {
        // let editor = $(`#source-code div[path="./folder-1/javascript.js"] > div.input`).get(0);
        //     editor = ace.edit(editor ,{wrap: true}); 
        //     editor.setTheme("ace/theme/dracula");//dracula
        //     editor.session.setMode('ace/mode/javascript');
        //     // editor.setOptions({ maxLines: 10000});
        //     editor.setOptions ({ enableBasicAutocompletion: true ,enableSnippets: true,enableLiveAutocompletion:true});
        //     editor.setOptions({
        //         autoScrollEditorIntoView: true,
        //         copyWithEmptySelection: true,
        //     });
        //     this.e = editor;

        // css = ace.createEditSession(["some", "css", "code here"]);
        // editor.renderer.setShowGutter(false);  عدم نمایش شماره خط
        // editor.setOption('showLineNumbers', false); 
        // editor.setOptions({
        //     showGutter: false,
        //     maxLines: 20
        //   });
    }
    getType(name) {
        let type;
        switch (name) {
            case 'js':
                type = "javascript";
                break;
            case 'html':
            case 'htm':
                type = "html";
                break;
            case 'css':
                type = "css";
                break;
            case 'text':
                type = "css";
                break;
            default:
                type = "text";
                break;
        }
        return type;
    }
    creat(mode, file_id, elmnt, value) {
        let editor, type;
        editor = ace.edit(elmnt.find(".input")[0], { wrap: true });
        // editor = ace.edit($(`#source-code div[file_id="${file_id}"] .input`)[0] ,{wrap: true}); 
        editor.setTheme(`ace/theme/${this.theme}`);
        type = this.getType(mode);
        // console.log(mode ,`ace/mode/${type}` ,)
        editor.session.setMode(`ace/mode/${type}`);
        editor.setOptions({ maxLines: 10000 });
        // console.log(value)
        editor.setValue(value);
        editor.setOptions({ enableBasicAutocompletion: true, enableSnippets: true, enableLiveAutocompletion: true });
        editor.setOptions({
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
        });
        // this.editors[file_id] = editor;
        editor.navigateFileEnd();

        //test
        // console.log(Object.getOwnPropertyNames (editor))
        // console.log(Object.getPrototypeOf (editor))
        //
        this.onChange(this.getEditors(file_id).find("textarea"), file_id)
        return editor;
    }
    getEditors(file_id) {
        if (file_id) { return $(`#source-code div[file_id="${file_id}"] > div.input`) }
        return $(`#source-code div[file_id] > div.input`)
    }
    onChange(elmnt, file_id) {
        let func = (event) => {
            if (this.dont_key.includes(event.keyCode)) {
                console.log("not change")
                return this.onChange(elmnt ,file_id)
            }
            console.log("change")
            return _.folderTabs.tab.onChangeFile(file_id);
        }
        elmnt.one("keydown", func)

    }
    run() {
        // theme editor
        _.header.menu.selectTheme.selectItem(this.theme);
        _.header.menu.selectTheme.func = $.proxy(
            function (cls) {
                cls.theme = $(this).attr("value");
                // for (let editor in cls.editors)
                // {
                //     cls.editors[editor].setTheme(`ace/theme/${cls.theme}`);
                // }
                let editors = cls.getEditors();
                for (let editor = 0; editor < editors.length; editor++) {
                    ace.edit(editors[editor]).setTheme(`ace/theme/${cls.theme}`);
                }
            }, null, this)

        // this.e = 'mahdi';
        // this.test()
    }
}















