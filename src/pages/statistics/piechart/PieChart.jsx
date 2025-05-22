import { useUsersContext } from '../../../context/usersContext';
import { useMemo } from 'react';
import styles from './pieChart.module.css';

const COLORS = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
];

const PieChart = () => {
  const { usersData } = useUsersContext();

  const countryData = useMemo(() => {
    const countryCount = usersData.reduce((acc, user) => {
      acc[user.country] = (acc[user.country] || 0) + 1;
      return acc;
    }, {});

    let total = Object.values(countryCount).reduce((sum, count) => sum + count, 0);
    let startAngle = 0;

    return Object.entries(countryCount).map(([country, count], index) => {
      const percentage = (count / total) * 100;
      const angle = (percentage / 100) * 360;
      const endAngle = startAngle + angle;
      
      // Calculate SVG path coordinates
      const startRadians = (startAngle - 90) * (Math.PI / 180);
      const endRadians = (endAngle - 90) * (Math.PI / 180);
      const radius = 100;
      const x1 = radius * Math.cos(startRadians);
      const y1 = radius * Math.sin(startRadians);
      const x2 = radius * Math.cos(endRadians);
      const y2 = radius * Math.sin(endRadians);

      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M 0 0`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      const slice = {
        country,
        count,
        percentage,
        pathData,
        color: COLORS[index % COLORS.length]
      };

      startAngle = endAngle;
      return slice;
    });
  }, [usersData]);

  return (
    <div className={styles.container}>
      <h2>Users by Country</h2>
      <div className={styles.chartContainer}>
        <svg viewBox="-100 -100 200 200">
          {countryData.map((slice, index) => (
            <path
              key={slice.country}
              d={slice.pathData}
              fill={slice.color}
              className={styles.slice}
            />
          ))}
        </svg>
        <div className={styles.legend}>
          {countryData.map((slice) => (
            <div key={slice.country} className={styles.legendItem}>
              <span 
                className={styles.colorBox} 
                style={{ backgroundColor: slice.color }}
              />
              <span>{slice.country}</span>
              <span>{slice.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;