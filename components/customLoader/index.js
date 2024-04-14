import styles from './loader.module.css';

const CustomLoader = () => (
	<div className={styles.container}>
		<div className={styles.spinner} />
		<div className={styles.text}>Loading...</div>
	</div>
);

export default CustomLoader