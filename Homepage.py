import streamlit as st
from ifc_viewer.ifc_viewer import ifc_viewer

# List of file paths
file_paths = ['./TEST.ifc', './Concrete.ifc', './3.ifc']

# Dropdown selector for file paths
selected_path = st.selectbox("Select File", options=file_paths)

# Call the IFC viewer with the selected path
ifc_viewer(selected_path)
