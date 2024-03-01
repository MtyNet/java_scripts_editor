// var parentElement = window.parent.document.getElementById("myElement");
class IFrames
{
    constructor(file_id ,path )
    {
        this.bodyIframe = $('#iframe-box');
        this.bodyConsole = $('#view-body .console-logs');
        this.bodytabs = $('#Views-tabs');
        this.file_id = file_id;
        this.path  = path;
        this.console = null;
        this.history = new ConsoleLogs($(`<div file-id="${this.file_id}" class="history-console scrllbar"></div>`));
        this.iframe = null;
        this.file_name = null;
        this.window = null;
        this.document = null;
        this.body  = null;
        this.head  = null;
        this.tab = null;
        this.creat();
        this.tabName();
        $(".console-logs .history-console").swap(this.history.history)
    }
    creat()
    {
        this.iframe = document.createElement('iframe');
        let ifm = this.bodyIframe.find('iframe');
        $(this.iframe).attr('file-id' ,this.file_id)
        // this.swap()
        this.bodyIframe.append(this.iframe);
        this.window = this.iframe.contentWindow;
        this.console = this.window.console;
        ConsoleIframe(this);

        this.document = this.iframe.contentDocument;
        this.head = $(this.document).find('head');
        this.body = $(this.document).find('body');
    }
    tabName()
    {
        this.tab = $(`
        <div file-id="${this.file_id}" class="tab">
            <i class="tab-js"><ion-icon name="code-sharp"></ion-icon></i>
            <h3>${this.path}</h3>
            <button type="button"><ion-icon name="close-sharp"></ion-icon></button>
        </div>
        `)
        this.tab.find('button').on('click' ,$.proxy(this.close ,this))
        this.bodytabs.append(this.tab)
        tabFunc(this ,this.tab)
        this.tab.click();
    }
    swap()
    {
      let ifm = this.bodyIframe.find('iframe');
      if (ifm.length){
        if (ifm.attr("file-id") == this.file_id){return}
        ifm.swap(this.iframe)
      }
      else{
        this.bodyIframe.append(this.iframe)
      }
      $(".console-logs .history-console").swap(this.history.history)
    }
    close()
    {
        // this.iframe.remove();
        $(this.iframe).remove();
        this.tab.remove();
        return delete this;
    }
}
function tabFunc(cls ,tab)
{
  tab.click(function(){
    if (tab.hasClass("active")){return}
    let ac = cls.bodytabs.find('.active');
    if (ac.length){ac.removeClass("active")}
    tab.addClass("active");
    cls.swap()
  })
}
function ConsoleIframe(cls ,tab)
{
    let originalLog = cls.console.log;
    cls.console.log = function(msg) {
      cls.history.log(msg);
      return originalLog.apply(null, arguments);
    }
    
    let originalError = cls.console.error;
    cls.console.error = function(msg) {
      cls.history.error(msg);
      return originalError.apply(null, arguments);
    }
    
    let originalAssert = cls.console.assert;
    cls.console.assert = function(expression, msg) {
      if (!expression) {
        cls.history.assert(msg);
      }
      return originalAssert.apply(null, arguments);
    }
    
    let originalDebug = cls.console.debug;
    cls.console.debug = function(msg) {
      cls.history.debug(msg);
      return originalDebug.apply(null, arguments);
    }
    
    let originalWarn = cls.console.warn;
    cls.console.warn = function(msg) {
      cls.history.warn(msg);
      return originalWarn.apply(null, arguments);
    }
    
    let originalInfo = cls.console.info;
    cls.console.info = function(msg) {
      cls.history.info(msg);
      return originalInfo.apply(null, arguments);
    }
    let originalClear = cls.console.clear
    cls.console.clear = function(){
      cls.history.clear();
      return originalClear();
    }

}
// document.getElementsByName("button")[0].onclick= ()=>{console.log('ok')}
/*
let m = new IFrames('1234' ,'./index');
m.body.html('<button id="mm">mty</button>')
m.head.append($(`<script>document.getElementById('mm').onclick = ()=>{alert('ok')};</script>`))
m.head.append($(`<script>document.getElementById('mm').onclick = ()=>{console.log('ok')};</script>`))
*/ 