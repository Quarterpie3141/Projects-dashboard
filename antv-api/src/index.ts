import express from 'express';
import dotenv from 'dotenv';
import Redis from 'ioredis';
import cors from 'cors';
const api = express();
api.use(cors());
dotenv.config();
const redis = new Redis(process.env.REDIS_URI ? process.env.REDIS_URI : (()=>{
	console.log(logTime() + 'no uri provided, using localhost:6379');
	return 'redis://localhost:6379';
})());


api.get('/projects', (req, res) => {
	fetchProjectsJSON()
		.then((obj) => {
			res.status(200).send(obj);
		})
		.catch((err)=> {
			console.log(logTime() + err);
			res.status(500).send({error: err.message});
		});
});
api.get('/project_details', (req, res) => {
	if(req.query.pid){
		fetchProjectDetailsJSON(req.query.pid as string)
			.then((obj) => {
				res.status(200).send(obj);
			})
			.catch((err)=> {
				console.log(logTime() + err);
				res.status(500).send({error: err.message});
			});
	}else{
		res.status(400).send({error: 'Project id not defined'});
	}
	
});


async function fetchProjectsJSON(){
	const json = await redis.call('JSON.GET', 'PROJECTS');
	if(typeof(json) === 'string'){
		return(JSON.parse(json));
	}else{
		throw new Error('Error fetching data');
	}
}

async function fetchProjectDetailsJSON(pid : string){
	const json = await redis.call('JSON.GET', 'PROJECT_DETAILS', pid);
	if(typeof(json) === 'string'){
		return(JSON.parse(json));
	}else{
		throw new Error('Error fetching data');
	}
}


redis.on('connect', () => {
	console.log(logTime() + 'successfully connected to redis');
	api.listen(3030, ()=>{
		console.log(logTime() + 'Api listening on port 3030');
	});
});

function logTime() : string{
	function addZero(i: number): string {
		if (i < 10) {
			return '0' + i.toString();
		}
		return i.toString();
	}
  
	function addZeroMs(i: number): string {
		if (i < 10) {
			return '00' + i.toString();
		} else if (i < 100) {
			return '0' + i.toString();
		}
		return i.toString();
	}
	const date = new Date();
	const time = addZero(date.getHours()) + ':' + addZero(date.getSeconds()) + ':' + addZeroMs(date.getMilliseconds()) + '    ';
	return time;
}