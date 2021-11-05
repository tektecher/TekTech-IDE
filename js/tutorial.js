// let term = null, fitAddon = null;
let tutorialShowFlag = false;
let beforeWidthTutorialSize = 350;

const MINIMUM_Tutorial_WIDTH = 350;


$("#close-tutorial,#open-terminal").click(() => {
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

let tutorialFullSizeFlag = false;
$("#resize-tutorial").click(() => {
    tutorialFullSizeFlag = !tutorialFullSizeFlag;
    if (tutorialFullSizeFlag) beforeWidthTutorialSize = $("#tutorial").width();
    $("#tutorial").width(tutorialFullSizeFlag ? "100%" : beforeWidthTutorialSize);
    if (tutorialFullSizeFlag) {
        $(".page > .main").css("display", "none");
    } else {
        $(".page > .main").css("display", "flex");
    }
    fitAddon.fit();
    localStorage.setItem("tutorial_size", $("#tutorial").width());
});

//$("#clear-terminal").click(() => term.clear());

$("#open-tutorial").click(() => {

    tutorialShowFlag = true;
    $("#tutorial").css("display", "flex");
    if (tutorialFullSizeFlag) {
        $(".page > .main").css("display", "none");
    } else {
        $("#tutorial").width(beforeWidthTutorialSize);
        Blockly.triggleResize();
    }
    if (editor) editor.layout();
    if (fitAddon) {
        setTimeout(() => {
            fitAddon.fit();
            fitAddon.fit();
        }, 10);
    }
    $("#tutorial-h-resize").css("display", "block");
    $("#tutorial-h-resize").css("right", $("#tutorial").width());
    localStorage.setItem("tutorial_size", $("#tutorial").width());
});

$("#tutorial-h-resize").bind('mousedown', function(event){
    offsetX = event.pageX - ($(document).width() - +$("#tutorial-h-resize").css("right").replace("px", ""));
    offsetX = $(document).width() + offsetX;
    $("#tutorial-h-resize").addClass("active");

    $(document).bind('mousemove', function(event){
        let rightPos = offsetX - event.pageX;
        rightPos = rightPos < MINIMUM_Tutorial_WIDTH ? MINIMUM_Tutorial_WIDTH : rightPos;
        $("#tutorial-h-resize").css("right", rightPos - 14);
    }).bind('mouseup', function(event){
        $(this).unbind('mousemove');
        $(this).unbind('mouseup');

        if (deviceMode === MODE_REAL_DEVICE) {
            $("#tutorial").width(+$("#tutorial-h-resize").css("right").replace("px", ""));
            localStorage.setItem("tutorial_size", $("#tutorial").width());
        } else if (deviceMode === MODE_SIMULATOR) {
            $("#simulator").width(+$("#tutorial-h-resize").css("right").replace("px", ""));
            localStorage.setItem("simulator_width_size", $("#simulator").width());
        }

        Blockly.triggleResize();
        if (editor) editor.layout();
        if (fitAddon) {
            setTimeout(() => {
                fitAddon.fit();
                fitAddon.fit();
            }, 10);
        }

        $("#tutorial-h-resize").removeClass("active");
    });
});

if (!isEmbed && deviceMode === MODE_REAL_DEVICE) {
    tutorial_size = localStorage.getItem("tutorial_size");
    if (tutorial_size) {
        tutorial_size = +tutorial_size;
        beforeWidthTutorialSize = tutorial_size >= MINIMUM_Tutorial_WIDTH ? tutorial_size : MINIMUM_Tutorial_WIDTH;
        $(() => $("#open-tutorial").click());
    }
}