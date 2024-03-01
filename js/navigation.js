class Navigation
{
    constructor()
    {
        $(".navigation .toggle").click(function(){$(".navigation").toggleClass("active");})
        $(".navigation ul li").click(function(){Navigation.manger($(this).attr("func"))})
    }
    static manger(mode)
    {
        switch (mode)
        {
            case "verticalMode":{_.resize.verticalMode();break};
            case "viewsMode":{_.resize.viewsMode();break};
                
            default:{alert(mode);break}
        }
    }
}
