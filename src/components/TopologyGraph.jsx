import React from 'react';
import { Graph } from 'react-d3-graph';

// Helper function to build graph data from subnet information
const buildGraphData = (data) => {
  const nodes = [{ id: 'Main Network', color: 'blue', size: 800 }];
  const links = [];

  data.forEach((subnet, index) => {
    const subnetId = `Subnet ${index + 1}`;

    nodes.push({
      id: subnetId,
      size: 400,
      color: 'green',
      ipRange: subnet.usableRange,
      subnetMask: subnet.subnetMask,
      broadcast: subnet.broadcastAddress,
    });

    // Link each subnet node to the main network node
    links.push({ source: 'Main Network', target: subnetId });
  });

  return { nodes, links };
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
            alert(`Node: ${nodeId}\nIP Range: ${node.ipRange}\nSubnet Mask: ${node.subnetMask}\nBroadcast: ${node.broadcast}`)
          }
        />
      </div>
    </div>
  );
};

export default TopologyGraph;
