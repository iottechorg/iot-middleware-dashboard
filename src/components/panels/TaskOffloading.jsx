// src/components/panels/TaskOffloading.jsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiRefreshCw, FiServer, FiList, FiEdit, FiSliders } from 'react-icons/fi';
import ResourceMonitor from '../task-offloading/ResourceMonitor';
import TaskDetail from '../task-offloading/TaskDetail';
import TaskForm from '../task-offloading/TaskForm';
import TaskList from '../task-offloading/TaskList';
import Button from '../common/Button';
import Card from '../common/Card';
import api from '../../services/api';


const TaskOffloading = () => {
  const [tasks, setTasks] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [view, setView] = useState('tasks'); // 'tasks', 'resources', 'taskDetail', 'taskForm'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    priority: 'all',
    node: 'all'
  });

  // Fetch tasks and nodes on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockTasks = await api.getTasks();
        const mockNodes = await api.getNodes();
        setTasks(mockTasks);
        setNodes(mockNodes);
      } catch (err) {
        console.error('Error fetching task offloading data:', err);
        setError('Failed to load task offloading information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle creating a new task
  const handleCreateTask = () => {
    setSelectedTask(null);
    setView('taskForm');
  };

  // Handle editing a task
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setView('taskForm');
  };

  // Handle viewing task details
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setView('taskDetail');
  };

  // Handle saving a task
  const handleSaveTask = (taskData) => {
    if (taskData.id && !taskData.id.startsWith('new-')) {
      // Update existing task
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskData.id ? { ...task, ...taskData } : task
        )
      );
    } else {
      // Add new task
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'queued',
        progress: 0
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
    setView('tasks');
    setSelectedTask(null);
  };

  // Handle canceling a task
  const handleCancelTask = (taskId) => {
    if (window.confirm('Are you sure you want to cancel this task?')) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: 'cancelled', progress: task.progress } 
            : task
        )
      );

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(prevTask => ({ ...prevTask, status: 'cancelled' }));
      }
    }
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      
      if (selectedTask && selectedTask.id === taskId) {
        setView('tasks');
        setSelectedTask(null);
      }
    }
  };

  // Handle viewing node details
  const handleViewNode = (node) => {
    setSelectedNode(node);
    setView('resources');
  };

  // Calculate task statistics
  const getTaskStats = () => {
    const total = tasks.length;
    const running = tasks.filter(t => t.status === 'running').length;
    const queued = tasks.filter(t => t.status === 'queued').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const failed = tasks.filter(t => t.status === 'failed').length;
    const cancelled = tasks.filter(t => t.status === 'cancelled').length;
    
    return { total, running, queued, completed, failed, cancelled };
  };

  // Calculate node statistics
  const getNodeStats = () => {
    const total = nodes.length;
    const online = nodes.filter(n => n.status === 'online').length;
    const offline = nodes.filter(n => n.status === 'offline').length;
    const warning = nodes.filter(n => n.status === 'warning').length;
    
    const totalCpu = nodes.reduce((sum, node) => sum + node.resources.cpu.total, 0);
    const usedCpu = nodes.reduce((sum, node) => sum + node.resources.cpu.used, 0);
    const cpuUtilization = totalCpu > 0 ? (usedCpu / totalCpu) * 100 : 0;
    
    const totalMemory = nodes.reduce((sum, node) => sum + node.resources.memory.total, 0);
    const usedMemory = nodes.reduce((sum, node) => sum + node.resources.memory.used, 0);
    const memoryUtilization = totalMemory > 0 ? (usedMemory / totalMemory) * 100 : 0;
    
    return { 
      total, 
      online, 
      offline, 
      warning, 
      cpuUtilization: cpuUtilization.toFixed(1), 
      memoryUtilization: memoryUtilization.toFixed(1),
      totalCpu,
      usedCpu,
      totalMemory,
      usedMemory
    };
  };

  // Filter tasks based on filter criteria
  const filteredTasks = () => {
    return tasks.filter(task => {
      if (filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }
      
      if (filters.type !== 'all' && task.type !== filters.type) {
        return false;
      }
      
      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }
      
      if (filters.node !== 'all' && task.assignedNode !== filters.node) {
        return false;
      }
      
      return true;
    });
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  // Render different views
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <Card>
          <div className="p-6 text-center">
            <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
            <Button 
              variant="primary" 
              onClick={() => window.location.reload()}
              icon={<FiRefreshCw />}
            >
              Retry
            </Button>
          </div>
        </Card>
      );
    }

    switch (view) {
      case 'taskDetail':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Task Details</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setView('tasks')}
                >
                  Back to Tasks
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleEditTask(selectedTask)}
                  icon={<FiEdit />}
                >
                  Edit Task
                </Button>
              </div>
            </div>
            
            {selectedTask && (
              <TaskDetail 
                task={selectedTask} 
                nodes={nodes}
                onCancel={() => handleCancelTask(selectedTask.id)}
                onDelete={() => handleDeleteTask(selectedTask.id)}
              />
            )}
          </div>
        );
        
      case 'taskForm':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {selectedTask ? 'Edit Task' : 'Create Task'}
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  setView(selectedTask ? 'taskDetail' : 'tasks');
                }}
              >
                Cancel
              </Button>
            </div>
            
            <TaskForm 
              task={selectedTask}
              nodes={nodes.filter(node => node.status === 'online')}
              onSave={handleSaveTask}
              onCancel={() => {
                setView(selectedTask ? 'taskDetail' : 'tasks');
              }}
            />
          </div>
        );
        
      case 'resources':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Resource Monitoring</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setView('tasks')}
                  icon={<FiList />}
                >
                  View Tasks
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreateTask}
                  icon={<FiPlus />}
                >
                  Create Task
                </Button>
              </div>
            </div>
            
            <ResourceMonitor 
              nodes={nodes}
              tasks={tasks}
              onNodeSelect={handleViewNode}
              selectedNode={selectedNode}
            />
          </div>
        );
        
      case 'tasks':
      default:
        const stats = getTaskStats();
        
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Task Offloading</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setView('resources')}
                  icon={<FiServer />}
                >
                  Resource Monitor
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreateTask}
                  icon={<FiPlus />}
                >
                  Create Task
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
                <p className="text-2xl font-bold">{stats.total}</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500">Running</h3>
                <p className="text-2xl font-bold text-green-600">{stats.running}</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500">Queued</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.queued}</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                <p className="text-2xl font-bold text-gray-600">{stats.completed}</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500">Failed</h3>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500">Cancelled</h3>
                <p className="text-2xl font-bold text-yellow-600">{stats.cancelled}</p>
              </Card>
            </div>
            
            <TaskList 
              tasks={filteredTasks()}
              nodes={nodes}
              onViewTask={handleViewTask}
              onEditTask={handleEditTask}
              onCancelTask={handleCancelTask}
              onDeleteTask={handleDeleteTask}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {renderContent()}
    </div>
  );
};

export default TaskOffloading;