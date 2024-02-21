import styles from './ProjectCard.module.css'
import React, { useCallback, useState } from 'react';
import { Card } from 'antd';

const { Meta } = Card;

interface ProjectCardProps{
  imgSrc: string,
  title: string,
  description: string,
  key: number,
  pid: string
}
export default function ProjectCard(props: ProjectCardProps){
    
    const [loading, setLoading] = useState(true);
    const onLoad = useCallback(() =>{
      console.log('loaded')
      setLoading(false)
    }, [])

    return (
        <>
          <div className=' m-10'>
              <a href={`/project?pid=${props.pid}`}>
                <Card
                className={styles.project_card}
                hoverable
                loading={loading}
                style={{backgroundColor: "rgba(44, 50, 56, 0.06)"}}
                cover={<img onLoad={onLoad} src={props.imgSrc} className=' object-cover md:max-h-[17rem] max-h-[6rem]'/>}
                key={props.key}
                >
                  <Meta
                    title={props.title}
                    description={props.description}
                  />
                </Card>
              </a>
          </div>
        </>
      );
}