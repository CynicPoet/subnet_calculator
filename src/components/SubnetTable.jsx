const SubnetTable = ({ data }) => (
  <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
    <thead>
      <tr>
        <th className="border px-4 py-2">Subnet</th>
        <th className="border px-4 py-2">Network Address</th>
        <th className="border px-4 py-2">Subnet Mask</th>
        <th className="border px-4 py-2">Broadcast Address</th>
        <th className="border px-4 py-2">Usable IP Range</th>
        <th className="border px-4 py-2">Total Hosts</th>
        <th className="border px-4 py-2">Reason</th>
      </tr>
    </thead>
    <tbody>
      {data.map((subnet, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">{subnet.subnet}</td>
          <td className="border px-4 py-2">{subnet.networkAddress}</td>
          <td className="border px-4 py-2">{subnet.subnetMask}</td>
          <td className="border px-4 py-2">{subnet.broadcastAddress}</td>
          <td className="border px-4 py-2">{subnet.usableRange}</td>
          <td className="border px-4 py-2">{subnet.totalHosts}</td>
          <td className="border px-4 py-2">{subnet.reason}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SubnetTable;
