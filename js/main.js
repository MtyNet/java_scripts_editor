// import ReSize from "./resize.js"
function importSrc(src) {
    let s = document.createElement('script');
    s.src = src;
    document.head.appendChild(s);
    return s;
}
(function ($) {
    $.fn.swap = function (b) {
        b = $(b)[0];
        var a = this[0];
        var t = a.parentNode.insertBefore(document.createTextNode(''), a);
        b.parentNode.insertBefore(a, b);
        t.parentNode.insertBefore(b, t);
        t.parentNode.removeChild(t);
        return this;
    }
}(jQuery));

class mangers {
    constructor() {
        importSrc('./js/loading.js');
        importSrc('./js/resize.js');
        importSrc('./js/navigation.js');
        importSrc('./js/header.js');
        importSrc('./js/folder-tabs.js');
        importSrc('./js/notifications.js');
        importSrc('./js/source-code.js');
        importSrc('./js/button-moveings.js');
        importSrc('./js/iframes.js');
        importSrc('./js/dialogs.js');
        importSrc('./js/source-file.js');
        importSrc('./js/welcome.js');
    }
    load() {
        this.loading = new Loading();
        this.Clogs = new ConsoleRun();
        // this.resize = new ReSize();
        this.nav = new Navigation();
        this.header = new Header();
        this.folderTabs = new FolderTabs();
        this.notif = new Notifications();
        this.code = new SourceCode();
        this.bmove = new buttonMoveings();
        this.pkg_mngr = new ProjectManger();
        this.src_file = new FileMangers();
        this.wlcm = new Welcome();
    }
}
const _ = new mangers();
function onload() {
    _.load()
    // console.log("log")
    // console.error('error')
    // console.assert(false,'assert')
    // console.warn('warn',1)
    // console.debug('debug')
    // console.info('info')
    // console.clear()

    let m = new IFrames('1234', './index');
    m.body.html('<button id="mm">mty</button>')
    // m.head.append($(`<script>document.getElementById('mm').onclick = ()=>{alert('ok')};</script>`))
    m.head.append($(`<script>document.getElementById('mm').onclick = ()=>{console.log('ok')};</script>`))
}