import styles from "./GenreCard.module.css";
import Image from "next/image";

const GenreCard = ({ name, onClick }) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.image}>
                <Image 
                    src={`/genre/${name}.jpg`} 
                    alt={`${name} Genre`} 
                    width={150} 
                    height={150} 
                    className={styles.img} 
                />
            </div>
            <div className={styles.name}>{name}</div>
        </div>
    );
};

export default GenreCard;
