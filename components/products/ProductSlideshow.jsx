import { Slide } from "react-slideshow-image";
import styles from './ProductSlideshow.module.css'
import 'react-slideshow-image/dist/styles.css'

export const ProductSlideshow = ({ images }) => {

    return (
        <Slide
            easing="ease"
            duration={7000}
            indicators
        >

            {
                images.map((image, index) => {
                    const url = `${image}`
                    return (
                        <div key={image} className={styles['each-slide']}>
                            <div style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}>
                            </div>
                        </div>
                    )
                })
            }
        </Slide>
    )
};