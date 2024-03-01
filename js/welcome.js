class Welcome {
    constructor() {
        this.min_screen = $(`<div id="difalt_screen"></div>`)
        _.src_file.container_source.append(this.min_screen)
        this.tab = $(`<div file_id="Welcome" class="tab active">
                        <i class="tab-css"><ion-icon name="logo-slack"></ion-icon></i>
                        <h3>Welcome</h3>
                        <button type="button"><ion-icon name="close-sharp"></ion-icon></button>
                    </div>`);
        _.folderTabs.tab.box.append(this.tab);
        let c = $(`<div id="Welcome" file_id="Welcome"  class="active">
                        <div class="continer scrllbar"></div>
                </div>`);
        _.src_file.container_source.append(c);
        this.container = c.find(".continer");
        this.tab.find("button").click(() => { this.close() })
        this.tab.click(function () {
            _.folderTabs.tab.click($(this));
            _.src_file.selectFile($(this).attr("file_id"));
        });
        this.onStart();
    }
    shortCode(text, btns) {
        let code = ``;
        for (let btn=0; btn < btns.length ;btn++) {
            code += `<span class="button">${btns[btn]}</span>`
            if (btn < btns.length-1) {code += "+"}
        }

        return `<div class="short-code">
                    <div class="text">${text}</div>
                    <div class="code">
                        ${code}
                    </div>
                </div>`;

    }
    onStart() {
        this.min_screen.append(`
        <div class="cntnr">
            <div class="logo"><ion-icon name="logo-slack"></ion-icon></div>
            ${this.shortCode("Show All Commands" ,["Ctrl","shift","P"])}
            ${this.shortCode("Open File" ,["Ctrl","shift","P"])}
            ${this.shortCode("Open Folder" ,["Ctrl","K","Ctrl","O"])}
            ${this.shortCode("Open Recent" ,["Ctrl","R"])}
        </div>
        `)
        this.container.append(`
        <div class="head">
            <h1>Visual Studio Code</h1>
            <h2>Editing evolved</h2>
        </div>
        <div class="starts">
            <h2 class="title">Start</h2>
            <ul>
                <li action="new-file"><i class="icon"><ion-icon name="document-outline"></ion-icon></i>
                    <h3 class="text">New File...</h3>
                </li>
                <li action="open-file"><i class="icon"><ion-icon name="document-text-outline"></ion-icon></i>
                    <h3 class="text">Open File...</h3>
                </li>
                <li action="open-folder"><i class="icon"><ion-icon name="folder-open-outline"></ion-icon></i>
                    <h3 class="text">Open Folder...</h3>
                </li>
                <li action="connect-profile"><i class="icon"><ion-icon name="git-merge-outline"></ion-icon></i>
                    <h3 class="text">Connect to Profile...</h3>
                </li>
            </ul>
        </div>
        <div class="exercises">
            <h2 class="title">Exercises</h2>
            <ul>
                <li action="html"><i class="icon"><ion-icon name="logo-html5"></ion-icon></i>
                    <h3 class="text">HTML</h3><i class="development" style="--w:50%;"></i>
                </li>
                <li action="css"><i class="icon"><ion-icon name="logo-css3"></ion-icon></i>
                    <h3 class="text">CSS</h3><i class="development" style="--w:90%;"></i>
                </li>
                <li action="python"><i class="icon"><ion-icon name="logo-python"></ion-icon></i>
                    <h3 class="text">Python</h3><i class="development" style="--w:20%;"></i>
                </li>
                <li action="javascript"><i class="icon"><ion-icon name="logo-nodejs"></ion-icon></i>
                    <h3 class="text">JavaScript</h3><i class="development" style="--w:80%;"></i>
                </li>
                <h3 class="text btn-more">More...</h3>
            </ul>
        </div>
        <div class="rescent">
            <h2 class="title">Rescent</h2>
            <ul>
                <li action="path">
                    <h3 class="text">v13</h3>
                    <h3 class="path">http://localhost:80/jupyter%20js/m/v13/</h3>
                </li>
                <li action="path">
                    <h3 class="text">v8</h3>
                    <h3 class="path">http://localhost:80/jupyter%20js/m/v8/</h3>
                </li>
                <li action="path">
                    <h3 class="text">v12</h3>
                    <h3 class="path">http://localhost:80/jupyter%20js/m/v12/</h3>
                </li>
                <li action="path">
                    <h3 class="text">web3</h3>
                    <h3 class="path">http://localhost:80/jupyter%20js/m/web3/</h3>
                </li>
                <li action="path">
                    <h3 class="text btn-more">More...</h3>
                </li>
            </ul>
        </div>
        `);
        this.container.find("li").on("click", $.proxy(this.rejisterLi, null, this));
    }
    rejisterLi(cls) {
        let action = $(this).attr("action");
        switch (action) {
            case 'connect-profile':
                _.pkg_mngr.onStart();
                break;

            default:
                console.log(action)
                break;
        }
    }
    close() {
        this.container.parent().remove();
        this.tab.remove();
    }
}