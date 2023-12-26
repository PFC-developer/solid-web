import { WalletName } from "cosmes/wallet"
import { ConnectedWallet } from "cosmes/wallet"
import { createSignal } from "solid-js"
import { WalletType } from "cosmes/wallet"
import { createStoredSignal } from "./storeSignal"
import { createStore } from "solid-js/store"
import { getGasPrice, getRpc } from "../connect/utils"
import { CONTROLLERS } from "../connect/constants"

export const [connectedWallet, setConnectedWallet] = createSignal<ConnectedWallet>()
export const [isConnected, setIsConnected] = createStoredSignal<boolean>(
  "wallet-connected",
  false
)
export const [chain, setChain] = createStoredSignal<string>("chain-id", "injective-1")
export const [type, setType] = createStoredSignal<WalletType>(
  "wallet-type",
  WalletType.EXTENSION
)
export const [wallets, setWallets] = createStore<Record<string, ConnectedWallet>>({})

export const [wallet, setWallet] = createStoredSignal<WalletName>(
  "wallet-name",
  WalletName.KEPLR
)

export interface IConnection {
  walletName: WalletName
}

export async function connect(type: WalletType, chainIds: string[]) {
  try {
    const chainInfos = chainIds.map(chainId => ({
      chainId,
      rpc: getRpc(chainId),
      gasPrice: getGasPrice(chainId)
    }))

    const res = await CONTROLLERS[wallet()].connect(type, chainInfos)
    // const foo: WalletController = CONTROLLERS[wallet()]

    setWallets({ ...wallets, ...Object.fromEntries(res) })
    setConnectedWallet(wallets[chain()])
    setIsConnected(true)
  } catch (err) {
    console.error(err)
    alert((err as Error).message)
  }
}
