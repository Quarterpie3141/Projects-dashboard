import { useEffect, useState } from "react"
import { Graph } from "@antv/x6"
import { useSearchParams } from "next/navigation";
import { Alert } from "antd";


interface ProjectTask {
    project_title: string;
    project_description: string;
    tasks: Task[];
}

interface Task {
    task_name: string;
    task_description: string;
    task_status: string;
    assigned_users: string[];
    sub_tasks: Task[];
}


export default function DAGGraph(){
    const project_id = useSearchParams().get('pid')
    const [errState, setErrState] = useState<Boolean>(false)

    useEffect(() => {
        if(project_id === null){
            setErrState(true)
        }

        const graph = new Graph({
          container: document.getElementById('container')!,
        });  
      }, []);

      useEffect(()=>{
        if (project_id) {
            fetchProjectDetails(project_id)
            .then((response) =>{
            
                console.log(response)
            
            })
            .catch((err)=>{
                setErrState(true);
            })
        }
    },[])   

    return(
        <>
            {
                errState?
                <div className=' fixed top-10 pr-[13rem] z-50 flex justify-end w-[100%] '>
                    <Alert
                    message="Error Loading Data"
                    description="No project id provided, or there was an error fetching the data, please try again"
                    type="error"
                    closable
                    />
                </div>
                :
                <></>
            }
            <div id="container" className=" h-full w-full">

            </div>
        </>
    )
}

async function fetchProjectDetails(pid: string){
    try {
        const response = await fetch(`http://localhost:3030/project_details?pid=${pid}`, {
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