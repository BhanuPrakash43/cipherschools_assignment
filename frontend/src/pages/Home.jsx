import { Link } from "react-router-dom";
import styles from './Home.module.css'; // Import the CSS module

function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to the Test Platform</h1>
      <p>Click the button below to start your test.</p>
      <Link to='/test' className={styles.startTestButton}>
        Start Test
      </Link>
    </div>
  );
}

export default Home;
