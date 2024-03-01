class buttonMoveings
{
    constructor()
    {
        this.box = $('#button-moveings').draggable({ containment: "parent" })
        this.box.on('click' ,function(){$(this).toggleClass("active");})
    }
}