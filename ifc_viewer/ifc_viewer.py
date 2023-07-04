import streamlit as st
from streamlit.components.v1 import components

# Declare the component
_ifc_viewer = components.declare_component("ifc_viewer", path="ifc_viewer")

def ifc_viewer(url: str):
    # Call the component and pass the url
    _ifc_viewer(url=url)
