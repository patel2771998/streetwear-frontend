import aboutStyle from "../styles/about.module.css";
import styles from "../styles/home.module.css";

import Link from "next/link";
import { createClient } from "../utils/client";
import { FaGithub } from "react-icons/fa";
import { formatPrices } from "../utils/prices";
import { useContext, useState } from "react";
import StoreContext from "../context/store-context";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import Image from "next/image"
import { useRouter } from 'next/router';
import Quickview from "../components/product/quickview";
import { BsSearch, BsEyeFill, BsHeart, BsEye } from "react-icons/bs";


export default function Home({ products, subtitle }) {

    const [isLoading, setLoading] = useState(false); //State for the loading indicator
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    const { cart } = useContext(StoreContext)
    const [productQuickView, setproductQuickView] = useState({});
    const [show, setShow] = useState(false);
    const [showhoverIcon, setshowhoverIcon] = useState(false);
    const handleClose = (p) => setShow(false);
    const handleShow = (p) => {
      setShow(true);
      setproductQuickView(p);

    }

  function MouseOver(event) {
    event.target.style.background = 'red';
  }

  var router = useRouter();
  let locale = router.locale;

  
  return (
    <div >
      <Quickview show={show} handleClose={handleClose} product={productQuickView}/>
      <section  className={aboutStyle.darkbg}>
        <Box p={2}>
        <Typography mt={0}  className={aboutStyle.sectionTitle} variant="h2" component="h2" >Shop</Typography>
        </Box>
      </section>
      <section className={styles.container}>
        <div className={styles.products}>
          <div className={styles.grid}>
            {products &&
              products.map((p) => {
                return (
                  <div key={p.id} className={styles.card}>
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
              
        </div>
      </section>
      s
    </div>
  );
}

export async function getStaticProps(locale) {


  const client = createClient();
  const { products } = await client.products.list();

  console.log(locale, 'local');

  return {
    props: {
      products
    },
  };
};
