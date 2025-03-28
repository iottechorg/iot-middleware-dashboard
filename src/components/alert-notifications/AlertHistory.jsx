import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import StatusIndicator from '../common/StatusIndicator';
import Button from '../common/Button';
import { formatDate } from '../../utils/dateUtils';
import api from '../../services/api';

const AlertHistory = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate API call to fetch alert history
    const fetchAlerts = async () => {
      try {
        // Replace with actual API call
        const history = await api.getAlertHistory();
        setAlerts(history);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching alert history:', error);
        
      }
    };

    fetchAlerts();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts.filter(alert => alert.severity === filter);

  const paginatedAlerts = filteredAlerts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'warning': return 'orange';
      case 'info': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Card title="Alert History">
      <div className="mb-4 flex gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          onClick={() => handleFilterChange('all')}
          size="sm"
        >
          All
        </Button>
        <Button
          variant={filter === 'critical' ? 'primary' : 'outline'}
          onClick={() => handleFilterChange('critical')}
          size="sm"
        >
          Critical
        </Button>
        <Button
          variant={filter === 'warning' ? 'primary' : 'outline'}
          onClick={() => handleFilterChange('warning')}
          size="sm"
        >
          Warning
        </Button>
        <Button
          variant={filter === 'info' ? 'primary' : 'outline'}
          onClick={() => handleFilterChange('info')}
          size="sm"
        >
          Info
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-4">Loading alerts...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedAlerts.map((alert) => (
                  <tr key={alert.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusIndicator status={alert.severity} color={getSeverityColor(alert.severity)} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{alert.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{alert.source}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(alert.timestamp)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="link" size="sm" onClick={() => console.log('View details', alert.id)}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
              <div className="flex flex-1 justify-between sm:hidden">
                <Button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(page * itemsPerPage, filteredAlerts.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredAlerts.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Button
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      variant="outline"
                      size="sm"
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <Button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        variant={pageNum === page ? 'primary' : 'outline'}
                        size="sm"
                      >
                        {pageNum}
                      </Button>
                    ))}
                    <Button
                      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={page === totalPages}
                      variant="outline"
                      size="sm"
                    >
                      Next
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default AlertHistory;