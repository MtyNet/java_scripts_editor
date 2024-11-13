// debugger
// $.parseHTML('<p>mahdi</p><br/>')
var index = 0;
var exe_i = 0;
var select_row = null; // _selected
var tEditor = {}
var FNM = null;
function select(ob) {
    if (select_row) {
        select_row.classList.toggle("_selected");
        // select_row.className = select_row.className.replace(" _selected", "");
    }
    ob.classList.toggle("_selected");
    // ob.className += " _selected";
    select_row = ob
    return
}
function focus_(ob) {
    let ar = ob.id.split("_")
    let div = document.getElementById(`RowDiv_${ar[1]}`)
    return select(div)
}
function add_js() {
    ++index
    let h = `
    <div class="_cell code_cell rendered _jsRow" tabindex="2" id="RowDiv_${index}" onclick="select(this)" type="js">
        <div class="_input">
            <div class="prompt_container">
                <div class="_prompt _out_prompt_overlay" title="Setting Row" onclick="_.settingRow.js(event,this)">
                    <bdi class="_input-color" id="InputNum_${index}">JS [ ]:</bdi>
                </div>
                <div class="run_this_cell" title="Run this cell">
                    <i class="fa-step-forward fa"></i>
                </div>
            </div>
            <div class="_inner_cell">
                <div class="ctb_hideshow">
                    <div class="celltoolbar">
                    </div>
                </div>
                <div class="_input_area" aria-label="Edit code here" id="CodeInput_${index}" onfocus="focus_(this)"></div>
            </div>
        </div>
    </div>
    `
    var notebook = document.getElementById("_NTB-CTNR");
    notebook.insertAdjacentHTML("beforeend", h);

    let editor = document.getElementById(`CodeInput_${index}`);
    editor = ace.edit(editor);
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode('ace/mode/javascript');
    editor.setOptions({ maxLines: 1000 });
    editor.setOptions({ enableBasicAutocompletion: true, enableSnippets: true, enableLiveAutocompletion: true });
    tEditor[`e_${index}`] = editor;
    addAutoCompilit(editor);
    return index;

}
function add_html() {
    ++index
    let h = `
    <div class="_cell code_cell rendered _htnRow " tabindex="2" id="RowDiv_${index}" onclick="select(this)" type="html">
        <div class="_input">
            <div class="prompt_container">
                <div class="_prompt _out_prompt_overlay" title="Setting Row" onclick="_.settingRow.html(event,this)">
                    <bdi class="_input-color" id="InputNum_${index}">HTML [ ]:</bdi>
                </div>
                <div class="run_this_cell" title="Run this cell">
                    <i class="fa-step-forward fa"></i>
                </div>
            </div>
            <div class="_inner_cell">
                <div class="ctb_hideshow">
                    <div class="celltoolbar">
                    </div>
                </div>
                <div class="_input_area" aria-label="Edit code here" id="CodeInput_${index}" onfocus="focus_(this)"></div>
            </div>
        </div>
    </div>
    `
    var notebook = document.getElementById("_NTB-CTNR");
    notebook.insertAdjacentHTML("beforeend", h);

    let editor = document.getElementById(`CodeInput_${index}`);
    editor = ace.edit(editor);
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode('ace/mode/html');
    editor.setOptions({ maxLines: 1000 });
    editor.setOptions({ enableBasicAutocompletion: true, enableSnippets: true, enableLiveAutocompletion: true });
    tEditor[`e_${index}`] = editor;
    return index;
}
function add_css() {
    ++index
    let h = `
    <div class="_cell code_cell rendered _cssRow " tabindex="2" id="RowDiv_${index}" onclick="select(this)" type="css">
        <div class="_input">
            <div class="prompt_container">
                <div class="_prompt _out_prompt_overlay" title="Setting Row" onclick="_.settingRow.css(event,this)">
                    <bdi class="_input-color" id="InputNum_${index}">CSS [ ]:</bdi>
                </div>
                <div class="run_this_cell" title="Run this cell">
                    <i class="fa-step-forward fa"></i>
                </div>
            </div>
            <div class="_inner_cell">
                <div class="ctb_hideshow">
                    <div class="celltoolbar">
                    </div>
                </div>
                <div class="_input_area" aria-label="Edit code here" id="CodeInput_${index}" onfocus="focus_(this)"></div>
            </div>
        </div>
    </div>
    `
    var notebook = document.getElementById("_NTB-CTNR");
    notebook.insertAdjacentHTML("beforeend", h);

    let editor = document.getElementById(`CodeInput_${index}`);
    editor = ace.edit(editor);
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode('ace/mode/css');
    editor.setOptions({ maxLines: 1000 });
    editor.setOptions({ enableBasicAutocompletion: true, enableSnippets: true, enableLiveAutocompletion: true });
    tEditor[`e_${index}`] = editor;
    // editor.on ("change", atuoRunCss); // test
    return index;
}
const GetId = (id = null, username = null) => {
    let row = select_row;
    let i
    if (row != null) {
        i = row.id.split("_")[1];
    }
    if (id != null) {
        i = id
        row = document.getElementById(`RowDiv_${i}`);
    }
    if (username != null) {
        i = username.split("_")[1];
        row = document.getElementById(`RowDiv_${i}`);
    }
    return {
        id: i,
        row: row,
        e: tEditor[`e_${i}`],
        script: `script_${i}`,
        style: `style_${i}`,
        RowDiv: `RowDiv_${i}`,
        CodeInput: `CodeInput_${i}`,
        InputNum: `InputNum_${i}`,
        OutNum: `OutNum_${i}`,
        OutPrint: `OutPrint_${i}`,
    }
}
function jsRun() {
    let i = GetId();
    delOutPut(i);
    if (i.e.getValue().trim() == "") { return };
    ++exe_i
    let inm = document.getElementById(i.InputNum)
    inm.innerHTML = `JS [ ${exe_i} ]:`
    var sc = document.getElementById(i.script);
    if (i.row.children.length > 1) { i.row.removeChild(i.row.children[1]) }
    try {
        if (sc) {
            document.head.removeChild(sc)
        }
        sc = document.createElement("script")
        sc.id = i.script
        sc.text += "try{"
        sc.text += i.e.getValue();
        sc.text += "\n\
                }catch (err) {print(err.message)}"
        document.head.appendChild(sc)
        //eval(code);
        // $.globalEval(code) //very god
    } catch (err) {
        print(err.message);
    } finally {
        return;
    }
}
// var htmlQut = {};
function htmlRun(ob) {
    let i = GetId()
    if (i.e.getValue().trim() == "") { return delOutPut(i) };
    var div = document.getElementById(i.RowDiv)
    let inm = document.getElementById(i.InputNum)
    inm.innerHTML = `HTML [ ${i.id} ]:`
    if (div.children.length > 1) {
        let out = document.getElementById(i.OutPrint);
        let onm = document.getElementById(i.OutNum);
        onm.innerHTML = `HTML [ ${i.id} ]:`;
        out.innerHTML = i.e.getValue();
        return;
    }
    let h = `<div class="_output _marginTop">
            <div class="prompt_container">
                <div class="_prompt _out_prompt_overlay" title="click to expand output; double click to hide output" ondblclick="htmlFullViwe(event)" onclick="htmlMin(this)">
                    <bdi class="_otput-color" id="${i.OutNum}">HTML [ ${i.id} ]:</bdi>
                </div>
                <div class="run_this_cell" title="Run this cell">
                    <i class="fa-step-forward fa"></i>
                </div>
            </div>
            <div class="_inner_cell">
                <div class="ctb_hideshow">
                    <div class="celltoolbar">
                    </div>
                </div>
                <div class="_qHtml SCR-DIV" id="${i.OutPrint}" ondblclick="htmlFullViwe(event)">${i.e.getValue()}</div>
            </div>
        </div>`
    div.insertAdjacentHTML("beforeend", h);
    return;

}
function cssRun(ob) {
    var i = GetId()
    if (i.e.getValue().trim() == "") { return };
    let inm = document.getElementById(i.InputNum)
    inm.innerHTML = `CSS [ ${i.id} ]:`
    var sc = document.getElementById(i.style);
    if (sc) {
        // document.head.removeChild(sc)
        sc.innerText = i.e.getValue();
        return;
    }
    else {
        sc = document.createElement("style");
        sc.id = i.style
        sc.innerText = i.e.getValue();
        document.head.appendChild(sc);
        i.e.on("change", atuoRunCss);
        return;
    }

}
function atuoRunCss() {
    let i = GetId();
    document.getElementById(i.style).innerText = i.e.getValue();
    return;
}
function delOutPut(i) {
    let o = i.row.querySelector("._output");
    if (o) { i.row.removeChild(o) };
    return;
}
function checkShiftEnter(e) {
    if (select_row == null) { return }
    if (e.keyCode == 13 && e.shiftKey) { // شناسایی دکمه shift+enter
        let value = select_row.getAttribute("type");
        let i = GetId();
        let ob = document.getElementById(i.CodeInput);
        ob.getElementsByTagName("textarea")[0].blur();


        if (value == "js") { jsRun(ob) };
        if (value == "html") { htmlRun(ob) };
        if (value == "css") { cssRun(ob) };
        if (select_row.nextElementSibling) {
            select_row.classList.toggle("_selected");
            select_row = select_row.nextElementSibling;
            select_row.classList.toggle("_selected");
        }
        else {
            let t = i.row.getAttribute("type");
            if (t == "js") { add_js(); }
            if (t == "html") { add_html(); }
            if (t == "css") { add_css(); }
            select_row.classList.toggle("_selected");
            select_row = select_row.nextElementSibling;
            select_row.classList.toggle("_selected");
        }
    }
    return;
}
function buttonRun() {
    let i = GetId()
    let value = i.row.getAttribute("type");
    let ob = document.getElementById(i.CodeInput)
    if (value == "js") { return jsRun(ob) };
    if (value == "html") { return htmlRun(ob) };
    if (value == "css") { return cssRun(ob) };
}
function delet_row() {
    let i = GetId()
    let parent = document.getElementById("_NTB-CTNR");
    parent.removeChild(i.row);
    select_row = null;
    delete tEditor[`e_${i.id}`]
    return
}
function dir(toCheck) {
    const props = [];
    let obj = toCheck;
    do {
        props.push(...Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));
    return props.sort().filter((e, i, arr) => { if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true; });
}
function print(val) {
    let i = GetId();
    var out = document.getElementById(i.OutPrint);
    if (!out) {
        let h = `<div class="_output _marginTop">
            <div class="prompt_container">
                <div class="_prompt _out_prompt_overlay" title="click to expand output; double click to hide output"  ondblclick="outLarge()">
                    <bdi class="_otput-color" id="${i.OutNum}">JS [ ${exe_i} ]:</bdi>
                </div>
                <div class="run_this_cell" title="Run this cell">
                    <i class="fa-step-forward fa"></i>
                </div>
            </div>
            <div class="_inner_cell">
                <div class="ctb_hideshow">
                    <div class="celltoolbar">
                    </div>
                </div>
                <div class="_out-viwe _out-print SCR-DIV" id="${i.OutPrint}"></div>
            </div>
        </div>`
        i.row.insertAdjacentHTML("beforeend", h);
        out = document.getElementById(i.OutPrint);
    }
    var color_
    if (out.children.length % 2 == 0) { color_ = "#362651" } else { color_ = "#263e51" };
    out.insertAdjacentHTML("beforeend", `<div class="_rPansser" style="background-color: ${color_};">${val}</div>`);
    return;

}
function revers_row() {
    if (select_row != null) {
        select_row.insertBefore(select_row.children[1], select_row.children[0]);
        return;
    }

}
function importSrc(src) { alert($.getScript(src)) }

function moveRow(mod) {
    var obj1 = select_row;
    var parent = select_row.parentElement;

    if (mod == "down") {
        var next = obj1.nextElementSibling;
        if (next) {
            parent.insertBefore(next, obj1);
        } else {
            add_js()
            moveRow(mod)
        }
    } else {
        var back = obj1.previousElementSibling;
        if (back) {
            parent.insertBefore(obj1, back);
        } else {
            let back = document.getElementById(`RowDiv_${add_js()}`);
            parent.insertBefore(back, obj1);
            parent.insertBefore(obj1, back);
        }
    }
}
function cheangMode() {
    let i = GetId()
    let t = select_row.getAttribute("type");
    if (t == "js") {

        select_row.className += " _htnRow";
        select_row.setAttribute("type", "html");
        i.e.getSession().setMode('ace/mode/html');
    }
    if (t == "html") {
        select_row.className = select_row.className.replace(" _htnRow", " ");
        select_row.setAttribute("type", "js");
        i.e.getSession().setMode('ace/mode/javascript');

    }
    return;
}
function addRowSide(mod) {
    if (select_row == null) { return }
    var parent = select_row.parentElement
    let nRow = document.getElementById(`RowDiv_${add_js()}`);
    if (mod == "down") {
        var obj1 = select_row.nextElementSibling
        parent.insertBefore(nRow, obj1);
    } else {
        var obj1 = select_row
        parent.insertBefore(nRow, obj1);
    }
}
function copyText() {
    let i = GetId()
    var p = document.getElementById(i.CodeInput).querySelector(".ace_content"); // گرفتن المان <p>
    var range = document.createRange(); // ساختن یک بازه
    range.selectNodeContents(p); // انتخاب محتوای المان <p>
    var selection = window.getSelection(); // گرفتن انتخاب فعلی
    selection.removeAllRanges(); // حذف همه بازه‌های قبلی
    selection.addRange(range); // اضافه کردن بازه جدید
    document.execCommand('copy'); // کپی کردن محتوای انتخاب شده
    alert('متن کپی شد.'); // نمایش پیام تأیید
}
function outLarge() {
    let i = GetId();
    let t = i.row.getAttribute("type");
    if (t == "js") {
        let o = document.getElementById(i.OutPrint);
        o.classList.toggle("_outLarge");
        return;
    }
    if (t == "html") {
        htmlFullViwe();
        return;
    }
    return;

}
function htmlFullViwe(e) {
    let i = GetId();
    _.htmlContiner.addNew(document.getElementById(i.OutPrint))
    return;
}
function htmlMin(t) {
    let i = GetId(id = null, username = t.parentNode.parentNode.parentNode.id);
    let b = document.getElementById(i.OutPrint);
    if (b.classList.length == 2) {
        return;
    }
    let o = t.parentNode.nextElementSibling;
    o.classList.toggle("_htmlMin")
    return;
}
window.onbeforeunload = function () {
    return "آیا مطمئن هستید که می‌خواهید صفحه را رفرش کنید؟";
}
window.addEventListener("keydown", preventSave);
function preventSave(e) {
    if (e.keyCode == 83 && e.ctrlKey) { e.preventDefault(); return _.save.saved() };
    return;
}
function menuUpLoad() {
    let divC = document.querySelector('.input-backup');
    divC.classList.toggle("_AC")
    divC.onclick = (event) => {
        if (event.target.className.startsWith("input-backup")) {
            return divC.classList.toggle("_AC");
        }
    }
    let input = document.getElementById('file-input');
    let h = document.querySelector(".input-box h3");
    input.onchange = function () {
        h.innerHTML = input.files[0].name;
        FNM = input.files[0].name;
    };
}
function readJsonFile() {
    // ایجاد یک شیء FileReader
    menuUpLoad();
    let check = document.querySelectorAll(".input-check input");
    let ts = document.getElementById("file-input");
    let file = ts.files[0];
    let reader = new FileReader();
    // if not marge sourc
    if (!check[1].checked) {
        document.getElementById("_NTB-CTNR").innerHTML = "";
        tEditor = {}
        index = 0;
        exe_i = 0;
        select_row = null;
        let nav = document.querySelector('._NVM');
        let cont = document.getElementById("_NTB-CTNR");
        nav.classList.remove("_htmlFullViweMenu");
        cont.classList.remove("_htmlFullViweNotebook");
    }
    // تعریف یک رویداد بارگذاری برای زمانی که خواندن فایل به پایان برسد
    reader.onload = function () {
        // دریافت محتوای فایل به صورت رشته
        let jsonString = reader.result;

        // تبدیل رشته به شیء جاوا اسکریپت
        let data = JSON.parse(jsonString);

        for (let index = 0; index < data.length; index++) {
            let d = data[index];
            let t = d.type;
            let i
            if (t == "js") {
                // obj.hasOwnProperty("name")
                // (obj.country !== undefined)
                // if ("output" in d)
                i = GetId(id = add_js());
                i.e.setValue(d.input);
                select(i.row);
                i.e.clearSelection();
                if (check[0].checked) { jsRun() }; // if check box run code
                continue;
            }
            if (t == "html") {
                i = GetId(id = add_html());
                i.e.setValue(d.input);
                select(i.row);
                i.e.clearSelection();
                htmlRun();
                continue;
            }
            if (t == "css") {
                i = GetId(id = add_css());
                i.e.setValue(d.input);
                // i.e.session.setValue(d.input);
                i.e.clearSelection();
                select(i.row);
                cssRun();
                continue;
            }
        }
    };

    // خواندن فایل به صورت متن
    reader.readAsText(file);
}
class _GET_BACKUP {
    constructor() {
        this.box = document.querySelector("._BXS");
    }
    creat() {
        this.box.classList.toggle("_AC");
        this.c = $.parseHTML(`
        <div class="_input-box">
            <div class="_file-input">
                <span><ion-icon name="cloud-upload-outline"></ion-icon></span>
                <input type="file" id="_file-input" accept=".json">
            
            </div>
            <div class="_input-check">
                <h3></h3>
                <label>run Js codes <input name="someName" type="checkbox" value="R"></label><br>
                <label>marge sources <input name="someName" type="checkbox" value="M"></label>
            </div>
            <button type="submit">view</button>
        </div>
        `)[1];
        this.box.appendChild(this.c)
        let input = this.c.querySelector('#_file-input');
        let h = this.c.querySelector("._input-box h3");
        input.onchange = function () {
            h.innerHTML = input.files[0].name;
        };
        let b = this.c.querySelector("button");
        b.onclick = () => (this.readJsonFile())
        return;
    }
    readJsonFile() {
        let check = this.c.querySelectorAll("._input-check input");
        let ts = this.c.querySelector("#_file-input");
        let file = ts.files[0];
        // _save.name
        _.save.name = ts.files[0].name;
        let reader = new FileReader();
        // if not marge sourc
        if (!check[1].checked) {
            document.getElementById("_NTB-CTNR").innerHTML = "";
            tEditor = {}
            index = 0;
            exe_i = 0;
            select_row = null;
            let nav = document.querySelector('._NVM');
            let cont = document.getElementById("_NTB-CTNR");
            nav.classList.remove("_htmlFullViweMenu");
            cont.classList.remove("_htmlFullViweNotebook");
        }
        // تعریف یک رویداد بارگذاری برای زمانی که خواندن فایل به پایان برسد
        reader.onload = function () {
            // دریافت محتوای فایل به صورت رشته
            let jsonString = reader.result;

            // تبدیل رشته به شیء جاوا اسکریپت
            let data = JSON.parse(jsonString);

            for (let index = 0; index < data.length; index++) {
                let d = data[index];
                let t = d.type;
                let i
                if (t == "js") {
                    // obj.hasOwnProperty("name")
                    // (obj.country !== undefined)
                    // if ("output" in d)
                    i = GetId(add_js());
                    i.e.setValue(d.input);
                    select(i.row);
                    i.e.clearSelection();
                    if (check[0].checked) { jsRun() }; // if check box run code
                    continue;
                }
                if (t == "html") {
                    i = GetId(add_html());
                    i.e.setValue(d.input);
                    select(i.row);
                    i.e.clearSelection();
                    htmlRun();
                    continue;
                }
                if (t == "css") {
                    i = GetId(add_css());
                    i.e.setValue(d.input);
                    // i.e.session.setValue(d.input);
                    i.e.clearSelection();
                    select(i.row);
                    cssRun();
                    continue;
                }
            }
        };

        // خواندن فایل به صورت متن
        reader.readAsText(file);
        return
    }
}
class _Save {
    constructor() {
        this.name = "Element.json";
        this.box = document.querySelector("._BXS");
    }
    creat() {
        this.box.classList.toggle("_AC");
        this.c = $.parseHTML(`
        <div class="_dl-continer">
            <h3>Set File Name</h3>
            <input type="text">
            <a id="_Link-BackUp"><h1>Save</h1></a>
        </div>
        `)[1];//_S.editeFileName(this)
        this.box.appendChild(this.c)
        this.c.querySelector("input").onchange = (event) => { this.editeFileName(event) };
        return;
    }
    saved() {
        this.creat();
        let rows = document.getElementsByClassName("_cell")
        let data = []
        for (let index = 0; index < rows.length; index++) {

            let t = rows[index].getAttribute("type");
            let i = GetId(null, rows[index].id);
            if (t == "js") {
                data.push({ type: "js", input: i.e.getValue() });
                continue;
            }
            if (t == "html") {
                data.push({ type: "html", input: i.e.getValue() });
                continue;
            }
            if (t == "css") {
                data.push({ type: "css", input: i.e.getValue() });
                continue;
            }
        }
        this.createDownloadLink(data);
        return;
    }
    createDownloadLink(content) {
        var jsonString = JSON.stringify(content);
        var blob = new Blob([jsonString], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        this.link = this.c.querySelector("#_Link-BackUp");
        this.c.querySelector("._dl-continer input").value = this.name;
        this.link.href = url;
        this.link.download = this.name;
    }
    editeFileName(e) {
        this.name = e.target.value;
        this.link.download = this.name;
        return;
    }

    getDemo() {
        function openDilogTestWidget(demo) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `https://mtynet.github.io/java_scripts_editor/my_element/${demo}.json`);
            xhr.responseType = "json";
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // body به عنوان JSON در xhr.response در دسترس است
                    var data = xhr.response;
                    console.log(data);
                    readJsonFile(data)
                    // ...
                } else {
                    openDilogTestWidget()
                    // خطا در بارگیری URL
                }
            };
            xhr.send();
            function readJsonFile(data) {
                for (let index = 0; index < data.length; index++) {
                    let d = data[index];
                    let t = d.type;
                    let i
                    console.log(data[index])
                    if (t == "js") {
                        i = GetId(add_js());
                        i.e.setValue(d.input);
                        select(i.row);
                        i.e.clearSelection();
                        jsRun() // if check box run code
                        continue;
                    }
                    if (t == "html") {
                        i = GetId(add_html());
                        i.e.setValue(d.input);
                        select(i.row);
                        i.e.clearSelection();
                        htmlRun();
                        htmlFullViwe();
                        continue;
                    }
                    if (t == "css") {
                        i = GetId(add_css());
                        i.e.setValue(d.input);
                        i.e.clearSelection();
                        select(i.row);
                        cssRun();
                        continue;
                    }
                }
                return
            }
        }
        var widget = [
            "cart-profile-org",
            "data-clouds-rain-loading",
            "magnetic-element-v-org",
            "menu-button-rotary",
            "login-v-org",
            "menu-bar-home-chat-like",
            "my-post-item menu-v3",
            "page-scroll-section-org",
            "post-item menu-v1",
        ]

        this.box.classList.toggle("_AC");
        this.c = $.parseHTML(`
        <div class="_dl-continer">
            <h3>Choose one of the demo projects</h3>
            <div id="_demo-BackUp"></div>
        </div>
        `)[1];//_S.editeFileName(this)
        var buttonsContainer = $(this.c).find("#_demo-BackUp");
        widget.forEach(function (item) {
            var button = $(`<a class="widget-button">${item}</a>`);
            button.on('click', function () {
                openDilogTestWidget(item);
                $("body > main > div._BXS._AC").click();
            });
            buttonsContainer.append(button);
        });
        this.box.appendChild(this.c);
    }
}
var wordList = ["print", "dir"];
function addAutoCompilit(editor) {
    var staticWordCompleter = {
        getCompletions: function (editor, session, pos, prefix, callback) {
            // فراخوانی تابع callback با لیست کلمات کلیدی
            callback(null, wordList.map(function (word) {
                return {
                    caption: word,
                    value: word,
                    meta: "keyword"
                };
            }));
        }
    };

    // اضافه کردن completer به ادیتور
    editor.completers.push(staticWordCompleter);

    // فعال کردن autocompit
    editor.setOptions({
        enableBasicAutocompletion: true
    });

    // اضافه کردن یک دستور سفارشی
    editor.commands.addCommand({
        name: "dotCommand",
        bindKey: { win: ".", mac: "." },
        exec: function () {
            // دریافت موقعیت فعلی مکان نما
            var pos = editor.selection.getCursor();
            // دریافت جلسه فعلی
            var session = editor.session;
            // دریافت خط فعلی
            var curLine = (session.getDocument().getLine(pos.row)).trim();
            // دریافت توکن های فعلی
            var curTokens = curLine.slice(0, pos.column).split(/\s+/);
            // دریافت دستور فعلی
            var curCmd = curTokens[0];
            if (!curCmd) return;
            // دریافت آخرین توکن
            var lastToken = curTokens[curTokens.length - 1];

            // وارد کردن نقطه
            editor.insert(".");

            // بررسی آخرین توکن
            if (lastToken === "document") {
                // تغییر لیست کلمات کلیدی برای شئ foo
                wordList = dir(document);
            }
            if (lastToken === "window") {
                // تغییر لیست کلمات کلیدی برای شئ foo
                wordList = dir(window);
            }
            //   else {
            //     // بازگشت به لیست پیش فرض کلمات کلیدی
            //     wordList = ["hello", "world", "foo", "bar"];
            //   }
        }
    });


}
class getFile {

    //__init__
    constructor(name = null, path = null) {
        this.name = name;
        this.path = path;
        this.file = null;
        this.newFile = null;
        this.elenemt = null;
        this.onload = null;
        // this.newFile = null;
        this.row = select_row;
        if (name == null && path == null) {
            this.openGetFile();
        }
        return
    }

    openGetFile() {
        let tag =
            `
        <div class="input-new-file boXshadow">
            <div class="input-box">
                <div class="file-input">
                    <span><ion-icon name="cloud-upload-outline"></ion-icon></span>
                    <input type="file">
                
                </div>
                <div class="input-check">
                    <h3>Select File</h3>
                    <h3></h3>
                </div>
                <button type="submit">get</button>
                <button type="submit">cancel</button>
            </div>
            
        </div>
        `
        // let parser = new DOMParser();
        // let doc = parser.parseFromString(htmlString, "text/html");
        this.elenemt = $.parseHTML(tag)[1];
        this.elenemt.getElementsByTagName("input")[0].onchange = (event) => { this.onSelectFile(event); }
        this.elenemt.getElementsByTagName("button")[0].onclick = () => { this.getNewFile() };
        this.elenemt.getElementsByTagName("button")[1].onclick = this.cancel;
        this.elenemt = document.body.appendChild(this.elenemt);
        this.elenemt.classList.toggle("_AC");
    }
    onSelectFile(t) {
        this.file = t.target.files[0];
        this.name = this.file.name;
        this.elenemt.getElementsByTagName("h3")[1].innerHTML = this.name;
        return;
    }
    cancel() {
        this.file = null;
        this.name = null;
        return document.body.removeChild(document.querySelector(".input-new-file"));
    }
    getNewFile() {
        if (this.onload) {
            select_row = this.row;
            this.onload();
        }
        return document.body.removeChild(document.querySelector(".input-new-file"));
    }
}
class _MOVE_ELEMENT {
    //__init__
    constructor() {
        this.continer = document.querySelector('._html-continer');
        this.button = document.querySelector("._FREE-BUTTON");
        // this.button.style.top = this.continer.offsetHeight -50;
        this.button.style.top = `${(this.continer.offsetHeight - 50) / this.continer.offsetHeight * 100}%`;
        // this.button.style.left = this.continer.offsetWidth -50;
        this.button.style.left = `${(this.continer.offsetWidth - 50) / this.continer.offsetWidth * 100}%`;
        this.button.onmousedown = () => { this.initReSize() };
        this.button.addEventListener('touchstart', this.onTouchDown, { passive: true });
        return;
    }
    initReSize() {
        this.continer.onmousemove = (event) => { this.onMove(event) };
        this.continer.onmouseup = () => { this.onUp() };
        this.button.onmouseup = () => { this.onUp() };
        return;
    }
    onTouchDown(e) {
        ;
        function onTouchMove(e) {
            e.preventDefault()
            let b = document.querySelector("._FREE-BUTTON");
            let c = document.querySelector('._html-continer');
            e = e.touches[0] || e.changedTouches[0];
            if (c.offsetHeight - 20 > e.clientY) {
                b.style.top = `${(e.clientY - 10) / c.offsetHeight * 100}%`;
                b.style.left = `${(e.clientX - 10) / c.offsetWidth * 100}%`;
            }
            return;
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
        this.continer.onmousemove = null;
        this.button.onmouseup = null;
        this.continer.onmouseup = null;
        return;
    }
    onMove(e) {
        if (this.continer.offsetHeight - 20 > e.clientY) {
            this.button.style.top = `${(e.clientY - 10) / this.continer.offsetHeight * 100}%`;
            this.button.style.left = `${(e.clientX - 10) / this.continer.offsetWidth * 100}%`;
        }
        return;
    }
}
class _RE_SIZE {
    //__init__
    constructor() {
        this.row = document.querySelector('._html-continer');
        this.button = document.querySelector("._RE-SIZE");
        this.button.onmousedown = () => { this.initReSize() };
        this.button.addEventListener('touchstart', this.onTouchDown, { passive: true });
        return;
    }
    initReSize() {
        document.onmousemove = (event) => { this.onMove(event) };
        document.onmouseup = () => { this.onUp() };
        this.button.onmouseup = () => { this.onUp() };
        return;
    }
    onTouchDown(e) {
        ;
        function onTouchMove(e) {
            e.preventDefault()
            let c = document.querySelector('._html-continer');
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
        document.onmousemove = null;
        this.button.onmouseup = null;
        document.onmouseup = null;
        return;
    }
    onMove(e) {
        if (window.innerHeight - 10 < e.clientY) { return }
        else { this.row.style.height = e.clientY; return; }
    }
}
// HTML_CONTINER
class _HTML_CONTINER {
    //__init__
    constructor() {
        let h = `<div class="_html-continer SCR-DIV">
                    <div class="_HCV SCR-DIV">
                        <div class="body"></div>
                    </div>
                    <span class="_FREE-BUTTON" title="OutPut Full Page"><ion-icon name="expand-outline"></ion-icon></span>
                    <div class="_RE-SIZE"></div>
                </div>`;
        document.body.insertAdjacentHTML("beforeend", h);
        this.continer = document.querySelector("._html-continer");
        document.body.appendChild(this.continer);
        document.querySelector("._FREE-BUTTON").ondblclick = () => { this.backRow() };
        // document.querySelector("._FREE-BUTTON").ondblclick= ()=>{this.fullBody()};
        this.html = this.continer.querySelector(".body");
        this.old_html = null;
        new _RE_SIZE()
        new _MOVE_ELEMENT()
    }
    fullBody() {
        console.log("fullBody")
    }
    backRow() {
        if (this.old_html) {
            this.old_html.appendChild(this.html.childNodes[0]);
            this.continer.classList.toggle("_AC");
            document.getElementById("_NTB-CTNR").classList.toggle("_htmlFullViweNotebook");
            document.querySelector('._NVM').classList.toggle("_htmlFullViweMenu");
            this.old_html = null;
        }
        return;
    }
    addNew(new_e) {
        if (this.old_html) {
            this.old_html.appendChild(this.html.childNodes[0]);
        }
        else {
            this.continer.classList.toggle('_AC');
            document.getElementById("_NTB-CTNR").classList.toggle("_htmlFullViweNotebook");
            document.querySelector('._NVM').classList.toggle("_htmlFullViweMenu");
        }
        this.old_html = new_e.parentNode;
        this.html.appendChild(new_e);
        return;
    }
}
// SettingRow
class _SettingRow {
    //__init__
    constructor() {
        this.box = document.querySelector("._BXS");
    }
    creat(e) {
        let c = $.parseHTML(`
                <div class="_STR">
                </div>
                `)[1];
        c.innerHTML = e;
        this.box.appendChild(c);
        this.box.classList.toggle("_AC");
        c.classList.toggle("_AC");
        c.onclick = () => {
            this.box.classList.toggle("_AC");
            this.box.innerHTML = "";
        }

        return
    }
    css() {
        this.creat(this.editRow([
            [1, `<span style="--i:1;--x:1;--y:0;" title="Atuo Run Css" onclick="ATUOrUNcSS()"><ion-icon name="infinite-outline"></ion-icon></span>`],
            [4, `<span style="--i:4;--x:1;--y:1;" title="Smile Row" onclick="SMILrOW()"><ion-icon name="contract-outline"></ion-icon></span>`],
            [5, `<span class="_S-L" style="--i:5;--x:-1;--y:-1;" title="cheang language to CSS"><ion-icon name="logo-css3"></ion-icon></span>`],
        ]));
        return;
    }
    js() {
        this.creat(this.editRow([
            [2, `<span class="_S-L" style="--i:2;--x:0;--y:-1;" title="cheang language to JavaScript"><ion-icon name="logo-nodejs"></ion-icon></span>`]
        ]));
        return;
    }
    html() {
        this.creat(this.editRow([
            [4, `<span style="--i:4;--x:1;--y:1;" title="OutPut Full Page" onclick="htmlFullViwe()"><ion-icon name="expand-outline"></ion-icon></span>`],
            [8, `<span class="_S-L" style="--i:8;--x:1;--y:-1;" title="cheang language to HTML 5"><ion-icon name="logo-html5"></ion-icon></span>`],
        ]));
        return;
    }
    editRow(row = [['index', 'item'], ['index', 'item']]) {
        let rows = [
            `<span style="--i:0;--x:-1;--y:0;" title="Run This Row" onclick="buttonRun()"><ion-icon name="play-outline"></ion-icon></ion-icon></span>`,
            `<span style="--i:1;--x:1;--y:0;" title="Revers Output And Input" onclick="revers_row()"><ion-icon name="git-compare-outline"></ion-icon></span>`,
            `<span style="--i:2;--x:0;--y:-1;" title="cheang language to JavaScript"><ion-icon name="logo-nodejs"></ion-icon></span>`,
            `<span style="--i:3;--x:0;--y:1;" title="Copy Input" onclick="copyText()"><ion-icon name="documents-outline"></ion-icon></span>`,
            `<span style="--i:4;--x:1;--y:1;" title="OutPut Larg" onclick="outLarge()"><ion-icon name="expand-outline"></ion-icon></span>`,
            `<span style="--i:5;--x:-1;--y:-1;" title="cheang language to CSS"><ion-icon name="logo-css3"></ion-icon></span>`,
            `<span style="--i:6;--x:0;--y:0;" title="Close Menu"><ion-icon name="apps-outline"></ion-icon></span>`,
            `<span style="--i:7;--x:-1;--y:1;" title="Delet Row" onclick="delet_row()"><ion-icon name="trash-outline"></ion-icon></span>`,
            `<span style="--i:8;--x:1;--y:-1;" title="cheang language to HTML 5"><ion-icon name="logo-html5"></ion-icon></span>`,

        ]
        row.forEach((value) => {
            rows[value[0]] = value[1];
        });
        return rows.join(' ');
    }
}
class _mangers {
    constructor() {


    }
    load() {
        this.settingRow = new _SettingRow();
        this.save = new _Save();
        this.getBackup = new _GET_BACKUP();
        this.htmlContiner = new _HTML_CONTINER();
    }
}
const _ = new _mangers();
function onLoad() {
    add_js()
    let navigation = document.querySelector('._NVM');
    let toggle = document.querySelector('._TG');
    toggle.onclick = function () {
        navigation.classList.toggle('_AC');
    }
    _.load()
    document.querySelector("._BXS").onclick = (event) => {
        if (event.target.className.startsWith('_BXS')) {
            event.target.innerHTML = "";
            document.querySelector("._BXS").classList.toggle("_AC");
        }
    }

    _.save.getDemo()
}
