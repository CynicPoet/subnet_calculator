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

  // Divide hosts evenly if subnets are provided
  const hostsPerSubnet = subnets ? Math.ceil(hosts / subnets) : hosts;

  // Calculate the required number of bits and subnet mask
  const hostBits = calculateNetworkBits(hostsPerSubnet);
  const totalHostsPerSubnet = (2 ** hostBits) - 2; // Usable hosts per subnet
  const subnetMask = 32 - hostBits; // Subnet mask

  // Calculate how many subnets are needed
  const requiredSubnets = subnets || Math.ceil(hosts / totalHostsPerSubnet);

  for (let i = 0; i < requiredSubnets; i++) {
    const subnetNetwork = incrementIP(baseIP, i * (totalHostsPerSubnet + 2));

    results.push({
      subnet: i + 1,
      networkAddress: subnetNetwork,
      subnetMask: `/${subnetMask}`,
      broadcastAddress: incrementIP(subnetNetwork, totalHostsPerSubnet + 1),
      usableRange: `${incrementIP(subnetNetwork, 1)} - ${incrementIP(subnetNetwork, totalHostsPerSubnet)}`,
      totalHosts: hostsPerSubnet,
      reason: `Subnet created to exactly fit ${hostsPerSubnet} hosts.`,
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