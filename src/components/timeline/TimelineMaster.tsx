import React, { useState } from 'react';
import { Plus, Search, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { TimelineTask, User } from '../../types';
import TimelineTaskForm from './TimelineTaskForm';

const mockWaiters: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'waiter' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'waiter' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'waiter' },
];

const initialTasks: TimelineTask[] = [
  {
    id: '1',
    orderId: 'ORD001',
    waiterId: '1',
    tableNumber: 'T1',
    status: 'completed',
    type: 'order',
    startTime: '2024-03-15T10:00:00Z',
    endTime: '2024-03-15T10:30:00Z',
    description: 'Table of 4, main course order',
  },
  {
    id: '2',
    orderId: 'ORD002',
    waiterId: '2',
    tableNumber: 'T2',
    status: 'in-progress',
    type: 'service',
    startTime: '2024-03-15T10:15:00Z',
    description: 'Refill water and check on customers',
  },
  {
    id: '3',
    orderId: 'CLN001',
    waiterId: '3',
    tableNumber: 'T3',
    status: 'pending',
    type: 'cleaning',
    startTime: '2024-03-15T10:45:00Z',
    description: 'Clean and prepare table for next customers',
  },
];

const TimelineMaster: React.FC = () => {
  const [tasks, setTasks] = useState<TimelineTask[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<TimelineTask | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mockWaiters.find(w => w.id === task.waiterId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTask = (newTask: TimelineTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
    setShowForm(false);
  };

  const handleUpdateTask = (updatedTask: TimelineTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setShowForm(false);
    setEditingTask(null);
  };

  const handleStatusChange = (taskId: string, newStatus: TimelineTask['status']) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          endTime: newStatus === 'completed' ? new Date().toISOString() : task.endTime,
        };
      }
      return task;
    }));
  };

  const getStatusIcon = (status: TimelineTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'in-progress':
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status: TimelineTask['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: TimelineTask['type']) => {
    switch (type) {
      case 'order':
        return '🍽️';
      case 'cleaning':
        return '🧹';
      case 'service':
        return '👨‍🍳';
      default:
        return '📋';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timeline Master</h1>
          <p className="mt-1 text-sm text-gray-500">Track waiter activities and table management</p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Task
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order ID, table number, or waiter name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const waiter = mockWaiters.find(w => w.id === task.waiterId);
          return (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">{getTypeIcon(task.type)}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">
                        {task.orderId}
                      </h3>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(task.status)}`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Table: {task.tableNumber} • Waiter: {waiter?.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      Started: {new Date(task.startTime).toLocaleString()}
                      {task.endTime && ` • Ended: ${new Date(task.endTime).toLocaleString()}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {task.status !== 'completed' && task.status !== 'cancelled' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(task.id, 'completed')}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      {task.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(task.id, 'in-progress')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange(task.id, 'cancelled')}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <TimelineTaskForm
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              initialData={editingTask}
              waiters={mockWaiters}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineMaster;