import styled from 'styled-components';
import defaultImg from '../images/room-1.jpeg'
//create a simple button for home page
// const orange ="#f15025"
// const SimpleButton = styled.button`
// color:${orange};
// background:green;
// width:60px;
// height:30px;
// border:none;
// font-size:23px;
// `
// export default SimpleButton


const styledHero =styled.header`
min-height: 60vh;
background: url(${props => props.img?props.img:defaultImg}) center/cover no-repeat;
display: flex;
align-items: center;
justify-content: center;
}
`
export default styledHero;