import { useState } from 'react';
import InputForm from './components/InputForm';
import SubnetTable from './components/SubnetTable';
import TopologyGraph from './components/TopologyGraph';
import { calculateSubnets } from './utils/subnetUtils';

function App() {
  const [data, setData] = useState([]);

  const handleFormSubmit = (inputs) => {
    const results = calculateSubnets(inputs);
    setData(results);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Subnet Calculator</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <InputForm onSubmit={handleFormSubmit} />
      </div>
      {data.length > 0 && (
        <>
          <SubnetTable data={data} />
          <TopologyGraph subnets={data} />
        </>
      )}
    </div>
  );
}

export default App;
