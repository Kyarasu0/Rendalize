import styles from './ImageBackground.module.css';

interface Props {
    theme?: string;
}

export const ImageBackground = ( { theme }: Props ) => {
    console.log("ImageBackground: ", import.meta.env.BASE_URL + theme);
    return(
        <div 
            className={styles.background}
            style={{ backgroundImage: theme ? `url(${ import.meta.env.BASE_URL + theme })` : undefined }}
        />
    );
};