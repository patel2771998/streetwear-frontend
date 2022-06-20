import styles from "../styles/home.module.css";
import Link from "next/link";
import { createClient } from "../utils/client";
import { FaGithub } from "react-icons/fa";
import { formatPrices } from "../utils/prices";
import { useContext, useState } from "react";
import StoreContext from "../context/store-context";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import Slider from "../components/home/slider";
import ClientSlider from "../components/home/clientSlider";
import ImageContent from "../components/home/imageContent";
import ContentImage from "../components/home/ContentImage";
import BannerMiddle from "../components/home/bannerMiddle";
import SaleBanner from "../components/home/SaleBanner";
import Quickview from "../components/product/quickview";
import HomeiconList from "../components/home/HomeiconList";
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Types } from '../constants/actionTypes';
import Footer from "../components/layout/Footer.jsx";
import productStyles from "../styles/product.module.css";
import Image from "next/image"
import { useRouter } from 'next/router';
  import { BsSearch, BsEyeFill, BsHeart, BsEye } from "react-icons/bs";
import Container from 'react-bootstrap/Container';



// import ar from "../lang/ar.json";
// import en from "../lang/en.json";
// import fr from "../lang/fr.json";
// import nl_NL from "../lang/nl-NL.json";

const Home = ({ products, subtitle }) => {
  const { cart } = useContext(StoreContext)

  function MouseOver(event) {
    event.target.style.background = 'red';
  }

  var router = useRouter();
  let locale = router.locale;

  var sectionHandpicked = {
    title: (locale === 'en-US' ? 'Title' : locale === 'fr' ? 'French title' : locale === 'nl-NL' ? "NL title" : "none"),
    subtitle: (locale === 'en-US' ? 'Subtitle' : locale === 'fr' ? 'French Sunbtitle' : locale === 'nl-NL' ? "NL Subtitle" : "none"),

  }

  var subtitle = locale === 'en-US' ? 'Subtitle' : locale === 'fr' ? 'French Sunbtitle' : locale === 'nl-NL' ? "NL Subtitle" : "none";
  const [productQuickView, setproductQuickView] = useState({});
  const [show, setShow] = useState(0);
  const [showhoverIcon, setshowhoverIcon] = useState(false);
  const handleClose = (p) => setShow(false);
  const handleShow = (p) => {
    setShow(1);
    setproductQuickView(p);

  }

  const handleMouseEnter = () => {
    setshowhoverIcon(true);
  };
  const handleMouseLeave = () => {
    setshowhoverIcon(false);
  };


  return (
    <div >
      {/* <section className={styles.topBanner} style={{backgroundColor: 'red' }}>
          <Typography>test</Typography>
      </section> */}
      <section className={styles.topBanner} style={{ backgroundColor: 'white' }}>
        <Slider />
      </section>
      <section className={styles.clientsSec} style={{overflow: 'hidden'}} >
        <ClientSlider />

      </section>
      <section className={styles.handpicked}>
        <ImageContent sectionContent={sectionHandpicked} />
      </section>
      <section className={styles.handpicked}>
        <ContentImage subtitle={subtitle} />
      </section>
      <section style={{overflow: 'hidden', borderBottom: '1px solid white'}}>
        <Box mt={10}>
          <SaleBanner />
        </Box>
      </section>
      <Quickview show={show} handleClose={handleClose} product={productQuickView}/>
      <section className={styles.container} style={{background: '#000'}}>

        <div className={styles.products}>
        <Typography className={styles.productTitle} variant="h1" component="div" gutterBottom>Recent products</Typography>
          <div className={styles.grid}>
            {products &&
              products.map((p) => {
                return (
                  <div key={p.id} className={styles.card} 
                      onMouseEnter={() => handleMouseEnter()}
                      onMouseLeave={() => handleMouseLeave()}>
                    
                    <Link
                      href={{ pathname: `/product/[id]`, query: { id: p.id } }}
                      passHref className={styles.productLink}>
                      <a className={styles.productLink}>
                        <div>
                          <figure className={styles.image}>
                            <div className={styles.placeholder}>
                              <Image
                                objectFit="cover"
                                layout="fill"
                                loading="eager"
                                src={p.thumbnail}
                                alt={`${p.title}`}
                              />
                            </div>
                            
                          </figure>
                          <div className={styles.cardhover}>
                            <h2>{p.title}</h2>
                            <p>{formatPrices(cart, p.variants[0])}</p>
                            
                          </div>
                        </div>
                      </a>
                    </Link>

                    <div className={styles.hoverIcon} show={showhoverIcon} >
                              <span>
                                <BsEye onClick={() => {
                                    handleShow(p);
                                }}/>
                              </span>
                              <span><BsHeart /></span>
                              
                          </div>
                  </div>
                );
              })}

          </div>
          <Grid container justifyContent="top" alignItems="center">
            <Grid item xs={12}>
              <Button href="#text-buttons" variant="outlined" color="primary" className={styles.button} style={{'display' : 'table', 'margin' : '0 auto'}}>Shop Now</Button>
            </Grid>
          </Grid>
        </div>
      </section>
      <section className={styles.blackbg} style={{borderTop: '1px solid #fff'}}>
          <Box className={styles.iconsecinner}
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              pt: 5,
              pb: 5,
              minWidth: 300,
            }}
          >
              <Container>
                  <HomeiconList />
              </Container>
          </Box>
      </section>
      <section className={styles.fullPageImage}>
        <BannerMiddle />
      </section>
    </div>
  );
}

export async function getStaticProps(locale) {


  const client = createClient();
  const { products } = await client.products.list();

  console.log(locale, 'local');
  var subtitle = locale === 'en-US' ? 'Subtitle' : locale === 'fr' ? 'French Sunbtitle' : locale === 'nl-NL' ? "NL Subtitle" : "none";
  // console.log(subtitle);

  return {
    props: {
      products,
      subtitle
    },
  };
};
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);