import React from 'react';
import pcImage from '../assets/pc.png'; // Adjust the path if needed
import '../App.css';  // or wherever your CSS file is located

// Component to render individual PC details
const PCDisplay = ({ ip, subnetMask, defaultGateway, hostNumber }) => {
    return (
      <div className="pc-container">
        <h4 className="host-title">Host {hostNumber}</h4> {/* Host Title */}
        <img src={pcImage} alt="PC" className="pc-image" /> {/* Use the imported image */}
        <div className="pc-details">
          <p><strong>IP Address:</strong> {ip}</p>
          <p><strong>Subnet Mask:</strong> {subnetMask}</p>
          <p><strong>Default Gateway:</strong> {defaultGateway}</p>
        </div>
      </div>
    );
};

// Helper function to split usable IP range into individual IPs
const getIPsFromRange = (range) => {
  const [startIP, endIP] = range.split(' - ');
  const startParts = startIP.split('.').map(Number);
  const endParts = endIP.split('.').map(Number);

  let ips = [];
  for (let i = startParts[3]; i <= endParts[3]; i++) {
    ips.push(`${startParts[0]}.${startParts[1]}.${startParts[2]}.${i}`);
  }

  return ips;
};

// Main component to render PCs for each host in the usable range
const PCVisualization = ({ subnets }) => {
  return (
    <div className="pc-visualization">
      {subnets.map((subnet, index) => {
        const usableIPs = getIPsFromRange(subnet.usableRange);

        return (
          <div key={index} className="subnet-section">
            <h3 className="subnet-title">Subnet {index + 1}</h3> {/* Subnet Title */}
            <div className="subnets">
              {usableIPs.slice(0, subnet.totalHosts).map((ip, i) => (
                <PCDisplay
                  key={`${index}-${i}`}
                  hostNumber={i + 1} // Pass host number
                  ip={ip}
                  subnetMask={subnet.subnetMask}
                  defaultGateway={usableIPs[usableIPs.length - 1]} // Assign the last usable IP as the default gateway
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PCVisualization;
