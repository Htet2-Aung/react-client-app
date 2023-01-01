import { useDispatch } from "react-redux";
import { useState } from "react";
import { addNewProject } from "../project/projectSlice";
function AddProjectForm(){
   
    const [projectName,setProjectName] = useState('');
    const [projectIdentifier,setProjectIdentifier] = useState("");
    const [description,setdescription] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [addRequestStatus,setaddRequestStatus] = useState('idle')

    const onProjectNameChange = e => setProjectName(e.target.value);
    const onProjectIdentifierChange = e => setProjectIdentifier(e.target.value);
    const onDescriptionChange = e => setdescription(e.target.value);
    const onStartDateChange = e => setStartDate(e.target.value);
    const onEndDateChange = e => setEndDate(e.target.value);
    const canSave = [projectName,projectIdentifier,description,startDate,endDate].every(Boolean) && addRequestStatus==='idle';

    const dispatch = useDispatch();

    const onSubmit = (event)=>{
        event.preventDefault();
        if(canSave){
            try {

                setaddRequestStatus('pending');

                dispatch(
                  addNewProject({
                        projectName,
                        projectIdentifier,
                        description,
                        startDate,
                        endDate
                    }
                    ),
                );
            } catch (error) {
                console.log(error)
            }finally{
                setaddRequestStatus('idle')
            }
            
        setProjectName('');
        setProjectIdentifier("");
        setdescription("");
        setStartDate('');
        setEndDate('');
    }
}
return (
        <div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Create / Edit Project form</h5>
                    <hr />
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control form-control-lg " 
                            placeholder="Project Name" 
                            value={projectName}
                            onChange={onProjectNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Unique Project ID"
                            value={projectIdentifier}
                            onChange={onProjectIdentifierChange}
                                />
                        </div>
                      
                        <div className="form-group">
                            <textarea 
                            className="form-control form-control-lg" 
                            placeholder="Project Description"
                            value={description}
                            onChange={onDescriptionChange}/>
                        </div>
                        <h6>Start Date</h6>
                        <div className="form-group">
                            <input 
                            type="date" 
                            className="form-control form-control-lg" 
                            value={startDate}
                            onChange={onStartDateChange} />
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input 
                            type="date" 
                            className="form-control form-control-lg" 
                            value={endDate}
                            onChange={onEndDateChange} />
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" disabled={!canSave}/>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}
export default AddProjectForm;