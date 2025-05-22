import styles from './statistics.module.css';
import PieChart from './piechart/PieChart';

function StatisticsPage() {
  return (
    <div className={styles.pageRoot}>
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Statistics Page</h1>
        <PieChart />
      </div>
    </div>
  );
}

export default StatisticsPage;