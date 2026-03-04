import styles from "./WhiteGrid.module.css";

export const COLORS = {
    blue: '#61baff',
    red: '#fd7979',
    green: '#79fd8d',
    white: '#eef2f8',
    black: '#333',
    grid: 'rgba(0,0,0,0.2)'
};

export const WhiteGrid = () => {
  return (
    <>
      {/* Grid Background */}
      <div className={styles.grid} />

      {/* Gradient Blobs */}
      <div className={`${styles.blob} ${styles.blobTop}`} />
      <div className={`${styles.blob} ${styles.blobBottom}`} />
    </>
  );
};