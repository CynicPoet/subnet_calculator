// src/App.jsx
import { useState } from 'react';
import Chat from './components/Chat';
import SubnetTable from './components/SubnetTable';
import PCVisualization from './components/PCVisualization';
import { calculateSubnets } from './utils/subnetUtils';

function App() {
  const [data, setData] = useState([]);

  const handleInputReceived = (inputs) => {
    const results = calculateSubnets(inputs);
    setData(results);
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Subnet Calculator</h1>
        {data.length > 0 && (
          <>
            <SubnetTable data={data} />
            <PCVisualization subnets={data} />
          </>
        )}
      </div>
      <div className="w-1/3 h-full p-4 bg-gray-100 border-l">
        <Chat onInputReceived={handleInputReceived} />
      </div>
    </div>
  );
}

export default App;
