import { useEffect, useState } from "react"
import { Graph, Node } from "@antv/x6"
import { DagreLayout } from "@antv/layout";}
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
    const [projectDetails, setProjectDetails] = useState<ProjectTask>()

    useEffect(() => {
        //check if a project id is defined in the querey parameters.
        if(project_id === null){
            setErrState(true)
            console.error('no project id provided')
        }

        //create the graph object
        const graph = new Graph({
          container: document.getElementById('container')!,
        });

        // check if project details is defined, then recursivly construct the nodes and edges for the graph
        if (projectDetails) {

            const rect = graph.addNode({
                x: 100,
                y: 100,
                width: 100,
                height: 40,
                label: projectDetails.project_title,
              });

            //constructGraphRecruse(arrayOfTasks, parentTask, graphObject)
            constructGraphRecurse(projectDetails?.tasks, rect, graph)
        }else{
            setErrState(true)
            console.error('no project details')
        }

    
    }, [projectDetails]);

      useEffect(()=>{
        if (project_id) {
            fetchProjectDetails(project_id)
            .then((response) =>{
                setProjectDetails(response)
            })
            .catch((err)=>{
                console.log(err);
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

function constructGraphRecurse(tasks: Task[], parent: Node | null, graph: Graph){
    for(const task of tasks){
        //create the node 
        const rect = graph.addNode({
            x: 100,
            y: 100,
            width: 100,
            height: 40,
            label: task.task_name,
          });
          //if the node has a parent, create the edge
          if(parent!==null){
            graph.addEdge({
                source: parent,
                target: rect,
            })
          }
          //if the node has sub tasks, recurse
          if(task.sub_tasks.length > 0){
            constructGraphRecurse(task.sub_tasks, rect, graph)
          }

    }
}

function apply