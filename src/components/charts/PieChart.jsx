// src/components/charts/PieChart.jsx
import React from 'react';

/**
 * Pie chart component using Recharts
 * @param {Object} props
 * @param {Array} props.data - Chart data
 * @param {string} props.nameKey - Key for item names
 * @param {string} props.dataKey - Key for item values
 * @param {string} [props.height='300px'] - Chart height
 * @param {Array} [props.colors] - Custom colors for pie slices
 * @param {boolean} [props.showLegend=true] - Whether to show legend
 * @param {boolean} [props.showTooltip=true] - Whether to show tooltip
 * @param {boolean} [props.showLabels=true] - Whether to show labels
 */
const PieChart = ({
  data = [],
  nameKey,
  dataKey,
  height = '300px',
  colors,
  showLegend = true,
  showTooltip = true,
  showLabels = true,
  className = '',
  ...props
}) => {
  // Import Recharts dynamically to avoid SSR issues
  const [RechartsComponents, setRechartsComponents] = React.useState(null);
  
  React.useEffect(() => {
    // Import necessary Recharts components
    import('recharts').then((module) => {
      setRechartsComponents({
        PieChart: module.PieChart,
        Pie: module.Pie,
        Cell: module.Cell,
        Tooltip: module.Tooltip,
        Legend: module.Legend,
        ResponsiveContainer: module.ResponsiveContainer,
      });
    });
  }, []);
  
  // Early return while loading Recharts
  if (!RechartsComponents) {
    return (
      <div 
        style={{ height }} 
        className={`flex items-center justify-center bg-white rounded-lg ${className}`}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const {
    PieChart: RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } = RechartsComponents;
  
  // Default colors if not provided
  const defaultColors = [
    '#3B82F6', // blue-500
    '#10B981', // green-500
    '#F59E0B', // amber-500
    '#EF4444', // red-500
    '#8B5CF6', // violet-500
    '#EC4899', // pink-500
    '#06B6D4', // cyan-500
  ];
  
  const pieColors = colors || defaultColors;
  
  // Custom label render function
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div style={{ height }} className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={showLabels ? renderCustomLabel : false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
            ))}
          </Pie>
          {showTooltip && <Tooltip />}
          {showLegend && (
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;