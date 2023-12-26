import {
  CosmostationController,
  KeplrController,
  LeapController,
  StationController,
  WalletController,
  WalletName,
  WalletType
} from "cosmes/wallet"

const WC_PROJECT_ID = "2b7d5a2da89dd74fed821d184acabf95"

export const CHAINS: Record<string, string> = {
  "osmosis-1": "Osmosis",
  "juno-1": "Juno",
  "kaiyo-1": "Kujira",
  "phoenix-1": "Terra",
  "columbus-5": "Terra Classic",
  "neutron-1": "Neutron",
  "migaloo-1": "Migaloo",
  "injective-1": "Injective"
}
export const WALLETS: Record<WalletName, string> = {
  [WalletName.KEPLR]: "Keplr",
  [WalletName.COSMOSTATION]: "Cosmostation",
  [WalletName.STATION]: "Terra Station",
  [WalletName.LEAP]: "Leap"
}
export const TYPES: Record<WalletType, string> = {
  [WalletType.EXTENSION]: "Extension",
  [WalletType.WALLETCONNECT]: "Wallet Connect"
}
export const CONTROLLERS: Record<string, WalletController> = {
  [WalletName.STATION]: new StationController(),
  [WalletName.KEPLR]: new KeplrController(WC_PROJECT_ID),
  [WalletName.LEAP]: new LeapController(WC_PROJECT_ID),
  [WalletName.COSMOSTATION]: new CosmostationController(WC_PROJECT_ID)
}
