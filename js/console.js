class ConsoleLogs
{
  constructor(history)
  {
    this.history = history;
  }
  
  static creat(mode ,icon ,msg)
  {
    return $(`
    <div class="console-msg ${mode} scrllbar">
        <i class="icon"><ion-icon name="${icon}"></ion-icon></i>
        <div class="content">${msg}</div>
    </div>
    `);
  }
  log(msg)
  {
    let e = ConsoleLogs.creat('log' ,'play' ,msg);
    this.history.append(e);
    return ;
  }
  error(msg)
  {
    let e = ConsoleLogs.creat('error' ,'close-circle' ,msg);
    this.history.append(e);
    return ;
  }
  assert(msg)
  {
    return this.error(msg);
  }
  debug(msg)
  {
    let e = ConsoleLogs.creat('debug' ,'bug' ,msg);
    this.history.append(e);
    return ;
  }
  warn(msg)
  {
    let e = ConsoleLogs.creat('warn' ,'warning' ,msg);
    this.history.append(e);
    return ;
  }
  info(msg)
  {
    let e = ConsoleLogs.creat('info' ,'information-circle' ,msg);
    this.history.append(e);
    return ;
  }
  clear()
  {
    this.history.html('')
  }
}
class ConsoleRun
{
  constructor()
  {
    $('#opon-console').click(function (){
      $(".console-logs").toggleClass("active")
    })
    this.box = $('.console-logs');
    this.resize = this.box.find('.resize-console');
    this.toggle_btn = this.box.find('.btn-toggle-console');
    this.input = this.box.find('#console-input');
    this.editor = null;
    this.consoleEditor();
    this.input.get(0).onkeydown = $.proxy(this.runSrc ,this) ;
  }
  consoleEditor()
  {
      let console = ace.edit(this.input.get(0) ,{wrap: true}); 
      console.setTheme("ace/theme/monokai");//dracula
      console.session.setMode('ace/mode/javascript');
      console.renderer.setShowGutter(false);
      console.setOptions({
        enableBasicAutocompletion: true ,
        enableSnippets: true,
        enableLiveAutocompletion:true,
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        maxLines: 9999,
      });
      this.editor = console;
  }
  runSrc(e)
  {
    
    if(!(e.keyCode == 13 && e.shiftKey)){return}
    e.preventDefault()
    let el = this.src('').find('.content');
    el = ace.edit(el.get(0))
    el.setOptions(this.editor.getOptions())
    el.setValue(this.editor.getValue());
    this.editor.setValue('')
    el.clearSelection()
    el.setReadOnly(true, true);//
  }
  src(msg)
  {
    let e = ConsoleLogs.creat('src ace-ambiance' ,'chevron-forward' ,msg);
    this.box.find('.history-console').append(e);
    return e;
  }
}









// var originalLog = console.log;
// console.log = function(msg) {
//   _.Clogs.log(msg);
//   return originalLog.apply(null, arguments);
// }

// var originalError = console.error;
// console.error = function(msg) {
//   _.Clogs.error(msg);
//   return originalError.apply(null, arguments);
// }

// var originalAssert = console.assert;
// console.assert = function(expression, msg) {
//   if (!expression) {
//     _.Clogs.assert(msg);
//   }
//   return originalAssert.apply(null, arguments);
// }

// var originalDebug = console.debug;
// console.debug = function(msg) {
//   _.Clogs.debug(msg);
//   return originalDebug.apply(null, arguments);
// }

// var originalWarn = console.warn;
// console.warn = function(msg) {
//   _.Clogs.warn(msg);
//   return originalWarn.apply(null, arguments);
// }

// var originalInfo = console.info;
// console.info = function(msg) {
//   _.Clogs.info(msg);
//   return originalInfo.apply(null, arguments);
// }
// var originalClear = console.clear
// console.clear = function(){
//   _.Clogs.clear();
//   return originalClear();
// }
// console.log: این متد برای چاپ هر گونه داده یا شیء در کنسول استفاده می‌شود. شما می‌توانید از آن برای نمایش مقادیر متغیرها، خروجی توابع، آرایه‌ها، شیء‌ها و غیره استفاده کنید1.
// console.error: این متد برای چاپ پیام‌های خطا در کنسول استفاده می‌شود. شما می‌توانید از آن برای نمایش خطاهای رخ داده در کد، استثناء‌های پرتاب شده، پیام‌های اخطار و غیره استفاده کنید2.
// console.warn: این متد برای چاپ پیام‌های هشدار در کنسول استفاده می‌شود. شما می‌توانید از آن برای نمایش هشدارهای مربوط به عملکرد کد، احتمال خطا، توصیه‌های بهبود و غیره استفاده کنید3.
// console.info: این متد برای چاپ پیام‌های اطلاعاتی در کنسول استفاده می‌شود. شما می‌توانید از آن برای نمایش اطلاعات مفید درباره کد، وضعیت برنامه، نکات و غیره استفاده کنید4.
// console.debug: این متد برای چاپ پیام‌های اشکال‌زدایی در کنسول استفاده می‌شود. شما می‌توانید از آن برای نمایش جزئیات فنی درباره کد، تغییرات داده، فرآیندهای داخلی و غیره استفاده کنید.
// علاوه بر این پیام‌ها، شما همچنین می‌توانید از توابع دیگری در کنسول استفاده کنید. برخی از این توابع عبارتند از:

// console.clear: این تابع برای پاک کردن همه پیام‌های قبلی در کنسول استفاده می‌شود. شما می‌توانید از آن برای تمیز کردن صفحه و شروع دوباره لاگ کردن استفاده کنید.
// console.count: این تابع برای شمارش تعداد دفعات فراخوانی یک عبارت خاص در کنسول استفاده می‌شود. شما می‌توانید از آن برای ردگیری تکرار حلقه‌ها، توابع، رخدادها و غیره استفاده کنید.
// console.group: این تابع برای ساخت گروه‌های جدولار در کنسول استفاده می‌شود. شما می‌توانید از آن برای سازمان‌دهی پیام‌های مرتبط با یکدیگر در یک بخش جداگانه استفاده کنید.
// console.table: این تابع برای نمایش داده‌ها به صورت جدول در کنسول استفاده می‌شود. شما می‌توانید از آن برای نمایش آرایه‌ها، شیء‌ها، خروجی توابع و غیره به صورت ساختارمند و خوانا استفاده کنید.
// console.time: این تابع برای شروع یک تایمر در کنسول استفاده می‌شود. شما می‌توانید از آن برای اندازه‌گیری مدت زمان اجرای کد، توابع، حلقه‌ها و غیره استفاده کنید.