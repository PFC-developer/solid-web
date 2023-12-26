export function getDenom(chain: string): string {
  switch (chain) {
    case 'osmosis-1':
      return 'uosmo'
    case 'juno-1':
      return 'ujuno'
    case 'kaiyo-1':
      return 'ukuji'
    case 'phoenix-1':
    case 'columbus-5':
      return 'uluna'
    case 'neutron-1':
      return 'untrn'
    case 'migaloo-1':
      return 'uwhale'
    case 'injective-1':
      return 'inj'
    default:
      throw new Error('Unknown chain')
  }
}

export function getGasPrice(chain: string): { amount: string; denom: string } {
  switch (chain) {
    case 'osmosis-1':
      return { amount: '0.0025', denom: getDenom(chain) }
    case 'juno-1':
      return { amount: '0.001', denom: getDenom(chain) }
    case 'kaiyo-1':
      return { amount: '0.00119', denom: getDenom(chain) }
    case 'phoenix-1':
      return { amount: '0.015', denom: getDenom(chain) }
    case 'columbus-5':
      return { amount: '28.325', denom: getDenom(chain) }
    case 'neutron-1':
      return { amount: '0.01', denom: getDenom(chain) }
    case 'migaloo-1':
      return { amount: '0.25', denom: getDenom(chain) }
    case 'injective-1':
      return { amount: '500000000', denom: getDenom(chain) }
    default:
      throw new Error('Unknown chain')
  }
}

export function getRpc(chain: string): string {
  switch (chain) {
    case 'osmosis-1':
      return 'https://rpc.osmosis.zone'
    case 'juno-1':
      return 'https://juno-rpc.polkachu.com'
    case 'kaiyo-1':
      return 'https://kujira-rpc.polkachu.com'
    case 'phoenix-1':
      return 'https://terra-rpc.publicnode.com'
    case 'columbus-5':
      return 'https://terra-classic-rpc.publicnode.com'
    case 'neutron-1':
      return 'https://neutron-rpc.polkachu.com'
    case 'migaloo-1':
      return 'https://migaloo-rpc.polkachu.com'
    case 'injective-1':
      return 'https://injective-rpc.polkachu.com'
    default:
      throw new Error('Unknown chain')
  }
}
