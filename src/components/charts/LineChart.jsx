// src/components/charts/LineChart.jsx
import React from 'react';

/**
 * Line chart component using Recharts
 * @param {Object} props
 * @param {Array} props.data - Chart data
 * @param {Array} props.lines - Configuration for each line
 * @param {string} props.xAxisKey - Key for X-axis data
 * @param {string} [props.height='300px'] - Chart height
 * @param {boolean} [props.showGrid=true] - Whether to show grid lines
 * @param {boolean} [props.showLegend=true] - Whether to show legend
 * @param {boolean} [props.showTooltip=true] - Whether to show tooltip
 */
const LineChart = ({
  data = [],
  lines = [],
  xAxisKey,
  height = '300px',
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className = '',
  ...props
}) => {
  // Import Recharts dynamically to avoid SSR issues
  const [RechartsComponents, setRechartsComponents] = React.useState(null);
  
  React.useEffect(() => {
    // Import necessary Recharts components
    import('recharts').then((module) => {
      setRechartsComponents({
        LineChart: module.LineChart,
        Line: module.Line,
        XAxis: module.XAxis,
        YAxis: module.YAxis,
        CartesianGrid: module.CartesianGrid,
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
    LineChart: RechartsLineChart,
    Line: RechartsLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } = RechartsComponents;
  
  // Default line colors if not specified
  const defaultColors = [
    '#3B82F6', // blue-500
    '#10B981', // green-500
    '#F59E0B', // amber-500
    '#EF4444', // red-500
    '#8B5CF6', // violet-500
    '#EC4899', // pink-500
    '#06B6D4', // cyan-500
  ];
  
  return (
    <div style={{ height }} className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fontSize: 12 }}
          />
          
          <YAxis 
            tick={{ fontSize: 12 }}
            width={40}
          />
          
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          
          {lines.map((line, index) => (
            <RechartsLine
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.color || defaultColors[index % defaultColors.length]}
              strokeWidth={2}
              dot={line.showDots ? {} : false}
              activeDot={{ r: 8 }}
              {...line.props}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;