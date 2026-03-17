import styles from './ImageBackground.module.css';

interface Props {
    theme?: string;
}

export const ImageBackground = ( { theme }: Props ) => {
    return(
        <div 
            className={styles.background}
            style={{ backgroundImage: theme ? `url(${ import.meta.env.BASEURL + theme })` : undefined }}
        />
    );
};