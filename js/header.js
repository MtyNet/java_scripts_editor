class Header
{
    constructor()
    {
        $(".button-mode li.mode").click(function(){$("body").toggleClass("dark");})
        $(".button-mode li.mode-view").click(function(){return $("body").toggleClass("viewsMode");})
        $(".header .btmMenu").click(function(){$("nav#menu").toggleClass("active");})
        $(".header .optionBtn").click(function(){$(this).toggleClass("active");})
        $(".header .PkgBtn").click(function(){ _.pkg_mngr.openDialog()})
        // $(".navigation ul li").click(function(){Navigation.manger($(this).attr("func"))})
        this.menu = new SettingMenu();
        this.run()
    }
    run()
    {

    }
}
class SettingMenu
{
    constructor()
    {
        $("#menu ul li:not(.select-input-ui li)").click($.proxy(this.manger ,null ,this));
        this.selectTheme = $("#theme-editor").selectInput();
        this.run();
    }
    manger(cls)
    {
        let mode = this.classList[0];
        switch (mode)
        {
            case "verticalMode":{$("body").toggleClass("vertical");break};
            case "views-tabs":{cls.viewsTabs(this);break};
            case "source-tabs":{cls.sourceTabs(this);break};
            case "direction":{cls.direction(this);break};
                
            default:{console.log(mode);break}
        }
    }
    viewsTabs(elmnt)
    {
        $(elmnt).toggleClass("active");
        if ($(elmnt).hasClass("active"))
        {
            $('.Views').removeClass('not-tabs')
            $('#Views-tabs .console-btn').append($("#opon-console"))
        }
        else
        {
            $('.Views').addClass('not-tabs')
            $('#button-moveings .console').append($("#opon-console"))
        }
    }
    sourceTabs(elmnt)
    {
        $(elmnt).toggleClass("active");
        if ($(elmnt).hasClass("active"))
        {
            $('section.code').removeClass('not-tabs')
            $('#tabs .folder-botton').append($("#opon-folder"))
        }
        else
        {
            $('section.code').addClass('not-tabs')
            $('#button-moveings .folder').append($("#opon-folder"))
        }
    }
    direction(elmnt)
    {
        $(elmnt).toggleClass('active');
        $('body').toggleClass('direction');
    }
    run()
    {
        this.selectTheme.add(
            [
                'ambiance','chaos','chrome','cloud9_day',
                'cloud9_night','cloud9_night_low_color','clouds','clouds_midnight',
                'cobalt','crimson_editor','dawn','dracula',
                'dreamweaver','eclipse','github','github_dark',
                'gob','gruvbox','gruvbox_dark_hard','gruvbox_light_hard',
                'idle_fingers','iplastic','katzenmilch','kr_theme',
                'kuroir','merbivore','merbivore_soft','mono_industrial',
                'monokai','nord_dark','one_dark','pastel_on_dark',
                'solarized_dark','solarized_light','sqlserver','terminal',
                'textmate','tomorrow','tomorrow_night','tomorrow_night_blue',
                'tomorrow_night_bright','tomorrow_night_eighties','twilight','vibrant_ink',
                'xcode',
            ]
            )
    }
}
class SelectInput
{
    constructor(selectId ,func=null)
    {
        this.parent = $(selectId);
        this.selected = this.parent.find(".selected");
        this.parent.click(function(){$(this).toggleClass('open')});
        this.menu = this.parent.find(".menu-select");
        this.parent.find('li').click($.proxy(this.itemClick,null ,this))
        this.func = func;
    }
    itemClick(t)
    {
        return t.click($(this) ,t);
    }
    add(list)
    {
        let i;
        for (i of list)
        {
            this.menu.append(
                $(`<li value="${i}">${i}</li>`).click($.proxy(this.itemClick,null ,this))
                )
        }
        return this;
    }
    selectItem(value)
    {
        let e = this.menu.find(`li[value="${value}"]`);
        return this.click(e ,this);
    }
    click(elmt ,t)
    {
        if (elmt.hasClass("active")){return}
        t.runFunc(elmt);
        t.selected.text(elmt.text());
        elmt.siblings('.active').removeClass('active');
        elmt.addClass('active');
        return t;
    }
    runFunc(elmt)
    {
        if(this.func)
        {
            return this.func.call(elmt.get(0));
        }
        return 
    }
}
(function ( $ ) 
{
    $.fn.selectInput = function(){return new SelectInput(this)};
} ( jQuery ));