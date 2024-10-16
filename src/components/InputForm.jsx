import { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [hosts, setHosts] = useState('');
  const [subnets, setSubnets] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hosts) {
      setError('Please enter the number of hosts.');
      return;
    }

    setError('');
    onSubmit({
      hosts: parseInt(hosts),
      subnets: subnets ? parseInt(subnets) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-xl font-semibold">Subnet Calculator Input</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="number"
        placeholder="Enter Number of Hosts"
        value={hosts}
        onChange={(e) => setHosts(e.target.value)}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="number"
        placeholder="Enter Number of Subnets (Optional)"
        value={subnets}
        onChange={(e) => setSubnets(e.target.value)}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Calculate
      </button>
    </form>
  );
};

export default InputForm;
