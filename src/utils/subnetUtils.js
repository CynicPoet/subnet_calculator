// src/utils/subnetUtils.js
function calculateNetworkBits(hosts) {
  let bits = 0;
  while ((2 ** bits) - 2 < hosts) {
    bits++;
  }
  return bits;
}

export function calculateSubnets({ hosts, subnets }) {
  console.log(`Calculating subnets with hosts: ${hosts}, subnets: ${subnets}`);
  let results = [];
  const baseIP = '192.168.0.0';

  const hostsPerSubnet = subnets ? Math.ceil(hosts / subnets) : hosts;
  const hostBits = calculateNetworkBits(hostsPerSubnet);
  const totalHostsPerSubnet = (2 ** hostBits) - 2;
  const subnetMask = 32 - hostBits;

  for (let i = 0; i < subnets; i++) {
    const subnetNetwork = incrementIP(baseIP, i * (totalHostsPerSubnet + 2));

    results.push({
      subnet: i + 1,
      networkAddress: subnetNetwork,
      subnetMask: `/${subnetMask}`,
      broadcastAddress: incrementIP(subnetNetwork, totalHostsPerSubnet + 1),
      usableRange: `${incrementIP(subnetNetwork, 1)} - ${incrementIP(subnetNetwork, totalHostsPerSubnet)}`,
      totalHosts: hostsPerSubnet,
      reason: `Subnet created to fit ${hostsPerSubnet} hosts.`,
    });
  }

  return results;
}

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
