import React from 'react';
import { Graph } from 'react-d3-graph';

// Helper function to build graph data for end devices
const buildGraphData = (subnets) => {
  const nodes = [{ id: 'Main Network', color: 'blue', size: 800 }];
  const links = [];

  subnets.forEach((subnet, index) => {
    const gateway = subnet.usableRange.split(' - ')[0]; // First usable IP is the gateway
    const subnetId = `Subnet ${index + 1}`;

    // Add devices for this subnet
    for (let i = 1; i <= subnet.totalHosts; i++) {
      const deviceIP = incrementIP(gateway, i); // Assign IP addresses to devices

      const deviceId = `Device ${index + 1}.${i}`;
      nodes.push({
        id: deviceId,
        size: 300,
        color: 'orange',
        ipAddress: deviceIP,
        subnetMask: subnet.subnetMask,
        defaultGateway: gateway,
      });

      // Optionally, link each device to the "Subnet" node
      links.push({ source: subnetId, target: deviceId });
    }

    // Add subnet node
    nodes.push({
      id: subnetId,
      size: 500,
      color: 'green',
      subnetMask: subnet.subnetMask,
    });

    // Link subnet to the main network
    links.push({ source: 'Main Network', target: subnetId });
  });

  return { nodes, links };
};

// Helper function to increment an IP address
const incrementIP = (ip, increment) => {
  const parts = ip.split('.').map(Number);
  let carry = increment;

  for (let i = parts.length - 1; i >= 0; i--) {
    const sum = parts[i] + carry;
    parts[i] = sum % 256;
    carry = Math.floor(sum / 256);
  }

  return parts.join('.');
};

const TopologyGraph = ({ subnets }) => {
  const graphData = buildGraphData(subnets);

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      size: 400,
      highlightStrokeColor: 'blue',
      labelProperty: 'id', // Display node labels
    },
    link: {
      highlightColor: 'lightblue',
    },
    directed: true, // Make it a tree-like structure
    collapsible: true, // Allow collapsing large graphs
    height: 800,
    width: 1200,
    d3: {
      gravity: -300, // Provide better spacing for large graphs
    },
  };

  return (
    <div className="mt-8 flex justify-center">
      <div
        className="w-full max-w-5xl overflow-auto bg-white p-4 shadow-lg rounded-lg"
        style={{ height: '600px' }} // Limit the height to make it scrollable
      >
        <h3 className="text-2xl font-semibold text-center mb-4">
          Network Topology Visualization
        </h3>
        <Graph
          id="network-graph"
          data={graphData}
          config={config}
          onClickNode={(nodeId, node) =>
            alert(`Device: ${nodeId}\nIP Address: ${node.ipAddress}\nDefault Gateway: ${node.defaultGateway}\nSubnet Mask: ${node.subnetMask}`)
          }
        />
      </div>
    </div>
  );
};

export default TopologyGraph;
