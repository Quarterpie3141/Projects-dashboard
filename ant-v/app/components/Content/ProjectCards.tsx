import { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"
import { Alert, Empty } from "antd"




export default function ProjectCards() {

    const [errState, setErrState] = useState<Boolean>(false);
    const [emptyProjects, setEmptyProjects] = useState<Boolean>(false)
    const [projectData, setProjectData] = useState<projectDataObj>()

    interface projectDetails{
        project_title: string,
        project_id: string,
        project_description: string,
        cover_url: string
    }
    interface projectDataObj{
        [key: string]: projectDetails
    }

    useEffect(()=>{
        fetchProjects()
        .then((response) =>{
            setProjectData(response);
            if(Object.keys(response).length == 0){
                setEmptyProjects(true);
            }
        })
        .catch((err)=>{
            setErrState(true);
        })
    },[])


    return(

        <div className=" flex">
            {
                errState?
                <div className=' fixed top-10 pr-[13rem] z-50 flex justify-end w-[100%] '>
                    <Alert
                    message="Error Loading Data"
                    description="There was an error fetching the data, please try again in a bit, message us on discord if it's still not fixed"
                    type="error"
                    closable
                    onClose={()=> setErrState(false)}
                    />
                </div>
                :
                <></>
            }
            <div className=" flex flex-wrap bg-zinc-100 justify-center">
            {
              
              projectData?
              Object.values(projectData).map((value, index)=>{
                return(<ProjectCard title={value.project_title} description={value.project_description} imgSrc={value.cover_url} pid={value.project_id} key={index} />)
              })
              :
              <div className=" md:ml-[32rem] ml-[5rem] flex justify-center mt-[10rem]">
                <Empty />
              </div> 

            }
            {
                emptyProjects?
                <div className=" md:ml-[32rem] ml-[5rem] flex justify-center mt-[10rem]">
                    <Empty />
                </div> 
                :
                <></>
            }
            </div>
            
        </div>
        
    )
}

async function fetchProjects(){
    try {
        const response = await fetch('http://localhost:3030/projects', {
            method: 'GET'
        })
        if(response.ok){
        return(response.json())
        }else{
            throw new Error('Error Fetching From Api')
        }
    } catch (error) {
        throw new Error('Error Fetching From Api' + error)
    }
}