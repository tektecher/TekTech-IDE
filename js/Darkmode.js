function greet(){
    document.documentElement.classList.toggle('dark-mode')
}
$("#dark-mode").click(() => {
    $("#tutorial").css("display", "none");
    if (tutorialFullSizeFlag) {
        $(".page > .main").css("display", "flex");
    }
    Blockly.triggleResize();
    if (editor) editor.layout();
    tutorialShowFlag = false;
    $("#tutorial-h-resize").css("display", "none");
    localStorage.removeItem("tutorial_size");
});