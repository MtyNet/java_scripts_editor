class Html
{
    constructor()
    {
        this.id;
        this.source_code;
        this.name;
        this.path;
    }
}

class javaScript
{
    constructor()
    {
        this.id;
        this.source_code;
        this.console;
        this.name;
        this.path;
    }
}

class Css 
{
    constructor()
    {
        this.id;
        this.source_code;
        this.name;
        this.path;
    }
}

class FileMangers
{
    constructor()
    {
        this.FILE_ID = {}
        this.container_source = $("#source-code");
    }
    randomString(length)
    { 
        let r = Math.random().toString(36).substr(2, length);
        if (this.checkFileId(r)){return this.randomString()}
        return r;
    }
    checkFileId(id)
    {
        if (id in this.FILE_ID){return true}
        else {return false}
    }
    getById(id)
    {
        if (this.FILE_ID.hasOwnProperty(id))
        {
            return this.FILE_ID[id];
        }
        return this.getFile(id);
    }
    setId(id ,val)
    {
        this.FILE_ID[id] = val;
    }
    selectFile(file_id)
    {
        let src = this.container_source.find(` > div[file_id="${file_id}"]`);
        if (src.hasClass("active")){return}
        else
        {
            this.container_source.find(" > div.active").removeClass("active");
            src.addClass("active");
        }
    }
    removeFile(file_id)
    {
        this.container_source.find(` > div[file_id="${file_id}"]`).remove();
    }
    getSrcAndCreat(file_elmnt)
    {
        this.container_source.find(" > div.active").removeClass("active");
        let e = $(`<div class="input-code active"  action="" type="" file_id="">
                    <div class="input" type=""></div>
                </div>`);
        this.container_source.append(e);
        let l = _.loading.dataRain(e[0]);
        l.start()
        let file_id = this.randomString();
        let name = file_elmnt.attr("file-name");
        let tab = _.folderTabs.tab.creat(file_id ,name); 
        let url = file_elmnt.attr("action");

        const success = (response)=>{
            let mode = name.split(".")
            // console.log(mode ,name)
            _.code.creat(mode[mode.length-1] ,file_id ,e ,response);
            setTimeout(()=>{l.close()}, 1000);
        }
        const error = (xhr, status, error)=>{
            console.log(status+error)
            return;
        }

        $.ajax({
            type: "get",
            url: url,
            dataType: 'text',
            success: success,
            error: error ,
            });
        file_elmnt.attr("file_id",file_id);
        e.attr("file_id",file_id);
        e.attr("action",url);
    }
}
class ProjectManger
{
    constructor()
    {
        this.profile = "project";
        this.project = null;
        this.select = null;
        this.dialog = null;
        this.data = null;
        this.url = null;
    }
    onStart()
    {
        this.dialog = new FlieDialogs(this,`http://localhost/${this.profile}/`);
    }
    openDialog()
    {
        if (this.dialog)
        {
            return this.dialog.open();
        }
        return this.onStart();
    }
    selectPkgLoadSource(url ,data)
    {
        let l = url.split("/");
        this.project = l[(l.length - 2)];
        this.data = data;
        this.url = url;
        $.ajax({
            type: "get",
            url: this.url+"?tree=true",
            data: {},
            dataType: "text",
            success: (response) =>{
                _.folderTabs.folder.add(JSON.parse(response) ,this.url);
                _.notif.add({mode:"success" ,text:`open project ${this.project}`,msg:this.url});
                this.dialog.close()
                $("#opon-folder").click()
                return
            },
            error: function(xhr, status, error) {
                console.log(status+error)
                return;
            }
        });
    }

}




















// $(document).ready(function () {
//     let n = new ProjectManger()
// });


// function checkImg()
//         {
//             fetch(url+"this.png")
//             // در صورت دریافت پاسخ، بررسی وضعیت آن
//             .then(response => {
//                 // اگر وضعیت پاسخ بین 200 تا 299 باشد، یعنی لینک موجود است
//                 if (response.status >= 200 && response.status <= 299) {
//                     data["img"] = response.url;
//                     return func.call(obj ,data);
//                 }
//                 else{
//                     data["img"] = null;
//                     return func.call(obj ,data);
//                 }
//             })
//             // در صورت خطا، نمایش پیغام خطا
//             .catch(error => {
//                 data["img"] = null;
//                 return func.call(obj ,data);
//             });
//         }