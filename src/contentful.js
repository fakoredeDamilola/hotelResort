import {createClient} from 'contentful';

export default createClient({
    //IF I WAS NOT DEPLOYING
    // space:"fkjxvj6c26zq",
    // accessToken:"ygsMKNa0Zu_LMfIVtu8OYL4K9pGnKbWI8ydhyKWxWvM"



    //IF I WAS DEPLOYING
    space:process.env.REACT_APP_API_SPACE,
    accessToken:process.env.REACT_APP_ACCESS_TOKEN

})