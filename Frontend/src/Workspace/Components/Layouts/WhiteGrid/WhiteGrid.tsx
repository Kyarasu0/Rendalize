import styles from "./WhiteGrid.module.css";

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