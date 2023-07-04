import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";

// Get a reference to the Streamlit object
const Streamlit = window.Streamlit;

const container = document.getElementById('viewer-container')
const viewer = new IfcViewerAPI({container, backgroundColor: new Color(0xffffff)});
viewer.axes.setAxes();
viewer.grid.setGrid();

async function loadIfc(url) {
    // Load the model
    const model = await viewer.IFC.loadIfcUrl(url);

    // Add dropped shadow and post-processing effect
    await viewer.shadowDropper.renderShadow(model.modelID);
    viewer.context.renderer.postProduction.active = true;

    // Now that the model is loaded, tell Streamlit that the component is ready
    Streamlit.setComponentReady();
}

Streamlit.onRender((data) => {
    const url = data.args.url;
    loadIfc(url);
});
