
import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";

function sendMessageToStreamlitClient(type, data) {
    const message = { ...data, isStreamlitMessage: true, type };
    window.parent.postMessage(message, "*");
}

function init() {
    sendMessageToStreamlitClient("streamlit:componentReady", {apiVersion: 1});
}

function setFrameHeight(height) {
    sendMessageToStreamlitClient("streamlit:setFrameHeight", {height});
}

const viewer = new IfcViewerAPI({container: document.getElementById('viewer-container'), backgroundColor: new Color(0xffffff)});
viewer.axes.setAxes();
viewer.grid.setGrid();

async function loadIfc(url) {
    const model = await viewer.IFC.loadIfcUrl(url);
    await viewer.shadowDropper.renderShadow(model.modelID);
    viewer.context.renderer.postProduction.active = true;
}

function onDataFromPython(event) {
    if (event.data.type !== "streamlit:render") return;
    const url = event.data.args.url;
    if(url){
        loadIfc(url);
    }
}

// Hook things up!
window.addEventListener("message", onDataFromPython);
init();

// Hack to autoset the iframe height.
window.addEventListener("load", function() {
    window.setTimeout(function() {
        setFrameHeight(500)
    }, 0);
});

