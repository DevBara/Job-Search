import React from "react";
import axios from "axios";
import removemd from "remove-markdown";
import MapSearch from "./MapSearch";
import "../styles/SearchPage.scss"



class SearchJobs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            jobsList:[],
        }
    }

    async getJobs(){
        const key=process.env.REACT_APP_API_KEY_JOB;
        const appId=process.env.REACT_APP_APP_ID_ID;
        try{
           let jobsInfo=await axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/${this.props.page}?app_id=${appId}&app_key=${key}&results_per_page=${this.props.results_per_page}&what=${this.props.what}&title_only=${this.props.what}&where=${this.props.where}&distance=${this.props.distance}&content-type=application/json`)
           this.setState({jobsList: jobsInfo.data.results});
        }
        catch(error){
           console.log(error);
        }
    }

    componentDidMount(){
        this.getJobs();

    }       
        
//the following function will check if this.state.jobList is not undefined .map will called to print out information for each job listing
    checkIfExist(){
        if(this.state.jobsList===undefined){}
        else{
            let jobs=this.state.jobsList.map((res,index)=> {
            let create=new Date(res.created)
            let dateCreated=create.getUTCMonth() + "/" +create.getUTCDay() + "/" +create.getUTCFullYear() + " at " + create.getUTCHours() + ":" + create.getUTCMinutes();//output date and time for each job listing
            return (
                    <div className="job-search-output-div-class">
                        <h2 className="job-search-output-class-h2">Title: {removemd(res.title)}</h2> 
                        <p className="job-search-output-class-p"><span class="span-job-map">Category: </span>{res.category.label}</p>
                        <p className="job-search-output-class-p"><span class="span-job-map">Company Name: </span>{res.company.display_name}</p>
                        <p className="job-search-output-class-p"><span class="span-job-map">Contract time: </span>{res.contract_time}</p>
                        <p className="job-search-output-class-p"><span class="span-job-map">Description: </span>{removemd(res.description)}</p>
                        <a className="job-search-output-class-a" href={res.redirect_url}>&#x1F517;Aditional information </a>
                        <p className="job-search-output-class-p"><span class="span-job-map">Created on: </span>{dateCreated}</p>
                        <MapSearch lat={res.latitude} lng={res.longitude}/>
                    </div>)
            })
            return jobs;
            }
    }

    render(){   
        return(
            <div id="main-div-job-search-results">
                { this.checkIfExist()}
            </div>
        )
    }
}

export default SearchJobs;


