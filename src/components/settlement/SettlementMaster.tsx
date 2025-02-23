import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Settlement, Channel } from '../../types';
import SettlementForm from './SettlementForm';
import ChannelForm from './ChannelForm';

const initialSettlements: Settlement[] = [
  { id: '1', name: 'Cash', commission: 0 },
  { id: '2', name: 'Credit Card', commission: 2.5 },
  { id: '3', name: 'Debit Card', commission: 1.5 },
  { id: '4', name: 'UPI', commission: 1.8 },
  { id: '5', name: 'Mobile Wallet', commission: 2.0 },
];

const initialChannels: Channel[] = [
  { id: '1', name: 'Dine In', commission: 0 },
  { id: '2', name: 'Takeaway', commission: 0 },
  { id: '3', name: 'Delivery', commission: 5 },
  { id: '4', name: 'Food Aggregator 1', commission: 25 },
  { id: '5', name: 'Food Aggregator 2', commission: 22 },
];

const SettlementMaster: React.FC = () => {
  const [settlements, setSettlements] = useState<Settlement[]>(initialSettlements);
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettlementForm, setShowSettlementForm] = useState(false);
  const [showChannelForm, setShowChannelForm] = useState(false);
  const [editingSettlement, setEditingSettlement] = useState<Settlement | null>(null);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [activeTab, setActiveTab] = useState<'settlements' | 'channels'>('settlements');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSettlements = settlements.filter((settlement) =>
    settlement.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSettlement = (newSettlement: Settlement) => {
    setSettlements([...settlements, { ...newSettlement, id: Date.now().toString() }]);
    setShowSettlementForm(false);
  };

  const handleUpdateSettlement = (updatedSettlement: Settlement) => {
    setSettlements(settlements.map((settlement) => 
      settlement.id === updatedSettlement.id ? updatedSettlement : settlement
    ));
    setShowSettlementForm(false);
    setEditingSettlement(null);
  };

  const handleDeleteSettlement = (id: string) => {
    setSettlements(settlements.filter((settlement) => settlement.id !== id));
  };

  const handleAddChannel = (newChannel: Channel) => {
    setChannels([...channels, { ...newChannel, id: Date.now().toString() }]);
    setShowChannelForm(false);
  };

  const handleUpdateChannel = (updatedChannel: Channel) => {
    setChannels(channels.map((channel) => 
      channel.id === updatedChannel.id ? updatedChannel : channel
    ));
    setShowChannelForm(false);
    setEditingChannel(null);
  };

  const handleDeleteChannel = (id: string) => {
    setChannels(channels.filter((channel) => channel.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settlement Master</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setActiveTab('settlements');
              setEditingSettlement(null);
              setShowSettlementForm(true);
            }}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'settlements' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Payment Method
          </button>
          <button
            onClick={() => {
              setActiveTab('channels');
              setEditingChannel(null);
              setShowChannelForm(true);
            }}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'channels' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Channel
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab('settlements')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'settlements' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Payment Methods
          </button>
          <button
            onClick={() => setActiveTab('channels')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'channels' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Channels
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'settlements' ? 'payment methods' : 'channels'}...`}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission (%)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activeTab === 'settlements' && filteredSettlements.map((settlement) => (
              <tr key={settlement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{settlement.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{settlement.commission}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingSettlement(settlement);
                      setShowSettlementForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSettlement(settlement.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {activeTab === 'channels' && filteredChannels.map((channel) => (
              <tr key={channel.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{channel.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{channel.commission}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingChannel(channel);
                      setShowChannelForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteChannel(channel.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSettlementForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <SettlementForm
              onSubmit={editingSettlement ? handleUpdateSettlement : handleAddSettlement}
              onCancel={() => {
                setShowSettlementForm(false);
                setEditingSettlement(null);
              }}
              initialData={editingSettlement}
            />
          </div>
        </div>
      )}

      {showChannelForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <ChannelForm
              onSubmit={editingChannel ? handleUpdateChannel : handleAddChannel}
              onCancel={() => {
                setShowChannelForm(false);
                setEditingChannel(null);
              }}
              initialData={editingChannel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettlementMaster;