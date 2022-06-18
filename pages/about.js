import styles from "../styles/about.module.css";
import Link from "next/link";
import { createClient } from "../utils/client";
import { FaGithub } from "react-icons/fa";
import { formatPrices } from "../utils/prices";
import { useContext } from "react";
import StoreContext from "../context/store-context";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import Slider from "../components/home/slider";
import ClientSlider from "../components/home/clientSlider";
import ImageContent from "../components/about/imageContent";
import ContentImage from "../components/about/ContentImage";
import BannerMiddle from "../components/home/bannerMiddle";
import Footer from "../components/layout/Footer.jsx";
import productStyles from "../styles/product.module.css";
import Image from "next/image"
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
//import {Card} from 'react-bootstrap/Card';
import Card from 'react-bootstrap/Card'
import banner2 from "../public/about/girl-boy.jpg"
// import ar from "../lang/ar.json";
// import en from "../lang/en.json";
// import fr from "../lang/fr.json";
// import nl_NL from "../lang/nl-NL.json";

export default function Home({ products, subtitle }) {
  const { cart } = useContext(StoreContext)

  function MouseOver(event) {
    event.target.style.background = 'red';
  }

  var router = useRouter();
  let locale = router.locale;

  var sectionHandpicked = {
    title: (locale === 'en-US' ? 'Who we are' : locale === 'fr' ? 'Who we are' : locale === 'nl-NL' ? "Who we are" : "Who we are"),
    subtitle: (locale === 'en-US' ? 'Subtitle' : locale === 'fr' ? 'French Sunbtitle' : locale === 'nl-NL' ? "NL Subtitle" : "none"),

  }
  var qualityAss = [
    {
      title: "Quality Assurance",
      desc: "We have passionate team who checks always the quality of every work. We always follow coding standards. we provide our contact information.",
      img: "about/quality.png"
    },
    {
      title: "Satisfaction Guarantee",
      img: "about/quality.png",
      desc: "We give 100% guarantee, for those clients who are not satisfied with the quality of the work or any unfulfilled requirement."
    },
    {
      title: "Transparency",
      img: "about/quality.png",
      desc: "We want to build lifetime relationship with clients. We provide information regarding progress of your milestones or project development."
    },
    {
      title: "Support and Maintenance",
      img: "about/quality.png",
      desc: "We are happy to help whenever you need help us. we provide our contact information. we provide our contact information."
    },
    {
      title: "On-time Delivery",
      img: "about/quality.png",
      desc: "Our goal is to deliver projects as per the given time frame in mean while stand by quality. we provide our contact information."
    },
    {
      title: "On-time ",
      img: "about/quality.png",
      desc: "Our goal is to deliver projects as per the given time frame in mean while stand by quality. we provide our contact information."
    }

  ];

  var subtitle = locale === 'en-US' ? 'Subtitle' : locale === 'fr' ? 'French Sunbtitle' : locale === 'nl-NL' ? "NL Subtitle" : "none";

  var cardColClass = "g-3 " + styles.cardCol;
  var classes = styles.darktheme + " "+styles.fullpageBanner;
  return (
    
    <div >
      <section  className={styles.darkbg}>
        <Box p={2}>
        <Typography mt={0}  className={styles.sectionTitle} variant="h2" component="h2" >About Us</Typography>
        </Box>
      </section>
     
      <section className={styles.handpicked}>
        <ContentImage subtitle={subtitle} />
      </section>
      {/* <section className={classes}>
        <div className={styles.overlay}>
            <div className={styles.overlayContent}>
                <Typography variant="h1">Title</Typography>
                <Typography variant="p">Desc</Typography>
            </div>
        </div>
      </section> */}
      <section className={styles.handpicked}>
        <ImageContent sectionContent={sectionHandpicked} />
      </section>
      
      
      
      
      <section className={styles.darkbg}>
      <Box p={6}>
        <div >
          <Container>
            <Typography mt={2} className={styles.sectionTitle} variant="h2" component="h2" >Why Choose us?</Typography>
            <Row xs={1} md={3} className="g-1 mt-5">
              {qualityAss.map((card) => (
                <Col className={styles.cardColClass}>
                  <Card className={styles.cardClass}>
                    <Card.Img variant="top" src={card.img} style={{
                      width: '72px', background: '#967844',
                      borderRadius: '50%', margin: '1rem'
                    }} />
                    <Card.Body className={styles.cardbody}>
                      <Card.Title className={styles.cardtitle}>{card.title}</Card.Title>
                      <Card.Text>{card.desc}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </Box>
      </section>
    </div>
      );
}

      export async function getStaticProps(locale) {
        console.log(locale, 'local');
      var subtitle = locale === 'en-US' ? 'Subtitle' : locale === 'fr' ? 'French Sunbtitle' : locale === 'nl-NL' ? "NL Subtitle" : "none";
      // console.log(subtitle);

      return {
        props: {
        subtitle
      },
  };
};
