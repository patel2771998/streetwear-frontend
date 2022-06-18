import React, { Component } from 'react'  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";  
import { Box, Typography } from '@material-ui/core';
import styles from '../../styles/slider.module.css';  
import Image from "next/image";
import banner2 from "../../public/home/home-banner2.webp"
import Carousel from 'react-bootstrap/Carousel';
//import 'bootstrap/dist/css/bootstrap.min.css';

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }


export class slider extends Component {  
    render() {  
        var settings = {  
          className: "slider slider-full-width",
          dots: false,  
          infinite: true,  
          speed: 500,  
          centerMode: true,  
          slidesToShow: 1,  
          slidesToScroll: 1,
          autoplay: true,
          arrows: false,
          arrow: true,
          // nextArrow: <SampleNextArrow />,
          // prevArrow: <SamplePrevArrow />  
          };  

          return (
            <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/hip-hop-dancer.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="streetwear-home.jpeg"
                alt="Second slide"
              />
          
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            {/* <Carousel.Item>
              <img
                className="d-block w-100"
                src="home/home-banner.jpg"
                alt="Third slide"
              />
          
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item> */}
          </Carousel>
          );
          return (  
            
            <Slider {...settings} >  
              <Box className={styles.wdt}>  
                  <Image src={banner2} style={{display: 'block' }} className={styles.hsImage}/>
                  <Typography>Bringing </Typography> 
              </Box>  
              {/* <Box className={styles.wdt}>  
                  <img src= {'banner-2.webp'} className={styles.hsImage}/>  
              </Box>   */}
              <Box className={styles.wdt}>  
              <img  className={styles.hsImage} src= {'streetwear-home.jpeg'} className={styles.hsImage}/>  
              </Box>  

              {/* <Box className={styles.wdt}>  
              <img  className={styles.hsImage} src= {'home/home-2-revolution-img-1.jpeg'} className={styles.hsImage}/>  
              </Box >  
              <Box className={styles.wdt}>  
              <img  className={styles.hsImage} src= {'home/home-2-revolution-img-2.jpeg'} className={styles.hsImage}/>  
              </Box>  
              <Box className={styles.wdt}>  
              <img  className={styles.hsImage} src= {'home/home-2-revolution-img-1.jpeg  '} className={styles.hsImage}/>  
              </Box>    */}
            </Slider>
          );  
        }  
}  
  


export default slider