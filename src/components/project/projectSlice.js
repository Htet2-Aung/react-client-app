import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_ALL_PROJECTS = 'http://localhost:8383/api/project/all';
const POST_NEW_PRPJECTS = 'http://localhost:8383/api/project/create';
const DELETE_PROJECT = 'http://localhost:8383/api/project/delete/';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const response = await axios.get(GET_ALL_PROJECTS);
    return response.data;
});

export const addNewProject = createAsyncThunk('projects/addNewProjects', async (initialProject) =>{
    const response = await axios.post(POST_NEW_PRPJECTS,initialProject);
    return response.data;
}
);
export const updateProject = createAsyncThunk('projects/updateProjects', async (initialProject) =>{
    const response = await axios.post(POST_NEW_PRPJECTS,initialProject);
    return response.data;
});
export const deleteProject = createAsyncThunk('projects/deleteProjects', async (projectId) =>{
    const response = await axios.delete(`${DELETE_PROJECT}${projectId}`);
    return response.data;
});

const initialState = {
    projects:[],
    status:'idle',
    error:null
}
export const projectSlice = createSlice({
    name:'projects',
    initialState,
    reducers:{
        addProject:{
            reducer(state,action) {
            state.push(action.payload);
        },
            prepare(projectName,projectIdentifier,description,startDate,endDate){
                return {payload:{
                    projectName,
                    projectIdentifier,
                    description,
                    startDate,
                    endDate,
                    }
                };
            },
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchProjects.pending,(state,action) => {
            state.status = 'loading';
        })
        .addCase(fetchProjects.fulfilled,(state,action) => {
            state.status = 'succecced';

            // state.projects = state.projects.concat(action.payload);
            state.projects = action.payload;
        })
        .addCase(fetchProjects.rejected,(state,action) => {
            state.status= 'failed';

            state.error = action.error.message;
        })
        .addCase(addNewProject.fulfilled,(state,action) => {
            state.status = 'succeeded'
            state.projects.push(action.payload)
        })
        .addCase(addNewProject.rejected,(state,action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(updateProject.fulfilled,(state,action)=>{
            const project = action.payload

            const projects = state.projects.filter(p => p.projectIdentifier !== project.projectIdentifier)

            state.projects = [project,...projects]

        })
        .addCase(deleteProject.fulfilled,(state,action)=>{
            const projects = state.projects.filter(p => p.projectIdentifier !== action.payload)

            state.projects = projects
        })
    }
});

export const selectAllProjects = (state) => state.projects.projects;
export const getProjectStatus = (state) => state.projects.status;
export const getProjectError = (state) => state.projects.error;
export const selectProjectByIdentifier = 
(state,projectId) => state.projects.projects.find(project => project.projectIdentifier === projectId)

export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;