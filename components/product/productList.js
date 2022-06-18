import Link from "next/link";
import styles from "../../styles/home.module.css";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import Image from "next/image"
import { useRouter } from 'next/router';
import { BsSearch, BsEyeFill, BsHeart, BsEye } from "react-icons/bs";

const productList = (props) => {
    const p = props.product;
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
    
}
export default productList;
