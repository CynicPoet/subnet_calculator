// Calculate the minimum number of bits required for the given number of hosts
function calculateNetworkBits(hosts) {
  let bits = 0;
  while ((2 ** bits) - 2 < hosts) {
    bits++;
  }
  return bits;
}

export function calculateSubnets({ hosts, subnets }) {
  let results = [];
  const baseIP = '192.168.0.0'; // Starting point for network

  // Calculate the exact number of network bits needed to fit the hosts
  const hostBits = calculateNetworkBits(hosts);
  const totalHostsPerSubnet = (2 ** hostBits) - 2; // Usable hosts per subnet
  const subnetMask = 32 - hostBits; // Calculate the subnet mask

  // If subnets are given, use that; otherwise, calculate the required number of subnets
  const requiredSubnets = subnets || 1; 

  for (let i = 0; i < requiredSubnets; i++) {
    const subnetNetwork = incrementIP(baseIP, i * (totalHostsPerSubnet + 2)); // Move to the next subnet

    results.push({
      subnet: i + 1,
      networkAddress: subnetNetwork,
      subnetMask: `/${subnetMask}`,
      broadcastAddress: incrementIP(subnetNetwork, totalHostsPerSubnet + 1),
      usableRange: `${incrementIP(subnetNetwork, 1)} - ${incrementIP(subnetNetwork, totalHostsPerSubnet)}`,
      totalHosts: totalHostsPerSubnet,
      reason: `Subnet created to exactly fit ${hosts} hosts.`,
    });
  }

  return results;
}

// Helper function to increment an IP address by a given offset
function incrementIP(ip, increment) {
  const parts = ip.split('.').map(Number);
  let carry = increment;

  for (let i = parts.length - 1; i >= 0; i--) {
    const sum = parts[i] + carry;
    parts[i] = sum % 256;
    carry = Math.floor(sum / 256);
  }

  return parts.join('.');
}
