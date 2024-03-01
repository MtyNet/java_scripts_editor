// export default class ReSize
class Notifications
{
    //__init__ 
    // _.notif.add({mode:"danger" ,text:'mty' ,msg:'text'});
    constructor(position="div.SourceCode > section.code") 
    {
        this.container = $('<div id="notifications-box"></div>');
        $(position).append(this.container);
        return;
    }
    add(data={mode:null ,text:null ,msg:null})
    {
        let icon ,notif;
        icon = {
            "success":`<ion-icon name="checkmark-circle"></ion-icon>`,
            "info":`<ion-icon name="notifications"></ion-icon>`,
            "warnig":`<ion-icon name="warning"></ion-icon>`,
            "danger":`<ion-icon name="nuclear"></ion-icon>`
        }
        if (data.mode)
        {
            if (data.text)
            {
                if (!icon[data.mode]){data.mode = "info"}
                notif = $(`
                <div class="notification-${data.mode}">
                    <div class="notif-header">
                        <div class="left">
                            <i>${icon[data.mode]}</i>
                            <span>${data.text}</span>
                        </div>
                        <i class="close"><ion-icon name="close-outline"></ion-icon></i>
                    </div>
                </div>
                `)
                if (data.msg)
                {
                    notif.append($(`<hr><div class="notif-text">${data.msg}</div>`))
                }
            }
            if (notif)
            {
                this.setFunc(notif);
                this.container.append(notif);
            }
        }
        else
        {
            return alert(data);
        }
    }
    setFunc(elment)
    {
        elment.find('.close').click(function(){elment.remove()})
        let now = new Date();
        let m = 10000;
        let st = setTimeout(function()
            {
                elment.remove();
            },m)
        elment.hover(function () {
                // over
                clearTimeout(st);
                m -= new Date() - now;
            }, function () {
                // out
                now = new Date();
                st = setTimeout(function(){elment.remove();},m+500);
            }
        );
    }
}