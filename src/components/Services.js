import React, { Component } from 'react'
import {FaCocktail,FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'
import Title from './Title'
export default class Services extends Component {
    state ={
        services:[
            {
                icon:<FaCocktail/>,
                title:"free cocktails",
                info:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, magnam velit officiis amet quidem consectetur illum quisquam. Pariatur ad ratione maiores, aliquam eum nisi, esse blanditiis minima quia consequuntur dolore?"
            },
            {
                icon:<FaHiking/>,
                title:"Endless Hiking",
                info:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, magnam velit officiis amet quidem consectetur illum quisquam. Pariatur ad ratione maiores, aliquam eum nisi, esse blanditiis minima quia consequuntur dolore?"
            },
            {
                icon:<FaShuttleVan/>,
                title:"free shuttle",
                info:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, magnam velit officiis amet quidem consectetur illum quisquam. Pariatur ad ratione maiores, aliquam eum nisi, esse blanditiis minima quia consequuntur dolore?"
            },
            {
                icon:<FaBeer/>,
                title:"strongest Beer",
                info:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, magnam velit officiis amet quidem consectetur illum quisquam. Pariatur ad ratione maiores, aliquam eum nisi, esse blanditiis minima quia consequuntur dolore?"
            }
        ]
    }
    render() {
        return (
            <div>
                <section className="services">
                   <Title title='services'/> 
                   <div className="services-center">
                       {this.state.services.map((item,index)=>{
return <article key={index} className="sservice">
    <span>{item.icon}</span>
    <h6>{item.title}</h6>
    <p>{item.info}</p>
</article>
                       })}
                   </div>
                </section>
                
                
            </div>
        )
    }
}
