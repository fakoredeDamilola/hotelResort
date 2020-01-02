import React, { Component } from 'react'
//LOCAL DATA
// import items from './data';
import Client from './contentful';


//setting up context api
const RoomContext = React.createContext();
//we have acces to provider and consumer
// <RoomContext.Provider value={}



class RoomProvider extends Component {
   state={
      rooms:[],
      sortedRooms:[],
      featuredRooms:[],
      loading:true,
      type:'all',
      capacity:1,
      price:0,
      minPrice:0,
      maxPrice:0,
      minSize:0,
      maxSize:0,
      breakfast:false,
      pets:false
   };
   //get data from contentful
   getData= async () =>{
       try{
let response = await Client.getEntries({
    content_type:"beachResortRoom",
    order:"sys.createdAt"
    // // order:"fields.price"


    // //for reverse order
    // order:"-fields.price"
});

let rooms = this.formatData(response.items);
    let featuredRooms = rooms.filter(room=>room.featured === true);
    let maxPrice=Math.max(...rooms.map(item =>item.price));
    let maxSize=Math.max(...rooms.map(item =>item.size));
    this.setState({
        rooms,
        featuredRooms,
        sortedRooms:rooms,
         loading:false,
         price:maxPrice,
         maxPrice,
         maxSize
    });

       } catch(error){
           console.log(error)
       }
   }

componentDidMount (){
//EXTERNAL DATA
this.getData()


    //IF WE ARE GETTING FROM INTERNAL DATA


    // let rooms = this.formatData(items);
    // let featuredRooms = rooms.filter(room=>room.featured === true);
    // let maxPrice=Math.max(...rooms.map(item =>item.price));
    // let maxSize=Math.max(...rooms.map(item =>item.size));
    // this.setState({
    //     rooms,
    //     featuredRooms,
    //     sortedRooms:rooms,
    //      loading:false,
    //      price:maxPrice,
    //      maxPrice,
    //      maxSize
    // });
}

formatData(items){
    let tempItems= items.map(item=>{
let id = item.sys.id;
let images =item.fields.images.map(image=>image.fields.file.url);
let room={
    ...item.fields,images,id
};
return room;



    });
    return tempItems
}

getRoom =(slug) =>{
    let tempRooms =[...this.state.rooms];
    const room = tempRooms.find(room =>room.slug ===slug);
    return room;
}

handleChange = event =>{
    const target = event.target;
    const value= target.type ==="checkbox"?target.checked:target.value
    
    const name = event.target.name;
   this.setState({
     [name] :value  
   },this.filterRooms)
  

}

filterRooms=()=>{
   let{
       rooms ,type,capacity,price,minSize,maxSize,maxPrice,breakfast,pets 
   }= this.state;

   //all the rooms
   let tempRooms=[...rooms];

//transform values
capacity =parseInt(capacity);
price =parseInt(price);

//filter by type
   if(type !== 'all'){
       tempRooms = tempRooms.filter(room =>room.type ===type)
   }
   //filter by capacity
   if(capacity !==1){
       tempRooms = tempRooms.filter(room =>room.capacity>=capacity)
   }
   //filter by price
tempRooms = tempRooms.filter(room => room.price<=price)

//filter by size
console.log(maxSize)
tempRooms = tempRooms.filter(room => room.size >= minSize && room.size >=maxPrice)
//filter by breakfast
if(breakfast){
    tempRooms = tempRooms.filter(room => room.breakfast===true);
}

//filter by pets
if(pets){
    tempRooms = tempRooms.filter(room => room.pets===true);
}

   //change state

   this.setState({
       sortedRooms:tempRooms
   })
}

    render() {
        return (
            <RoomContext.Provider value={{...this.state,getRoom:this.getRoom,handleChange:this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

//creatinf a consumer
const RoomConsumer = RoomContext.Consumer;




//using higher order component instead of the method used in RoomComponent which is useed for rfc

export function withRoomConsumer(Component){
    return function consumerWrapper(props){
        return <RoomConsumer>
{value => <Component {...props} context={value}/>}
            </RoomConsumer>
    }
}

export {RoomProvider,RoomConsumer,RoomContext};