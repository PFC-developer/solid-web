import { Component, For, onMount } from "solid-js"
import { UnsignedTx } from "cosmes/wallet"

import { routes } from "./routes"
import { useRoutes } from "@solidjs/router"

import { MsgSend } from "cosmes/client"
import { getDenom } from "./connect/utils"
import Nav from "./layout/nav"
import { CONTROLLERS, WALLETS } from "./connect/constants"
import {
  chain,
  connect,
  disconnect,
  isConnected,
  setWallets,
  type,
  wallet,
  wallets
} from "./stores/createWalletStore"

const SIGN_ARBITRARY_MSG =
  "Hi from Coinhall! This is a test message just to prove that the wallet is working."
const TX_MEMO = "signed via cosmes"

const App: Component = () => {
  //const location = useLocation()
  const Route = useRoutes(routes)

  onMount(() => {
    for (const controller of Object.values(CONTROLLERS)) {
      // Register to diconnect event
      controller.onDisconnect(wallets => {
        const chains = wallets.map(w => w.chainId)
        console.log("Wallet disconnected", {
          wallet: controller.id,
          chains
        })
        for (const chain of chains) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          setWallets(chain, undefined!)
        }
      })
      // Register to account change event
      controller.onAccountChange(wallets => {
        // Reconnect the affected wallets
        const chains = wallets.map(w => w.chainId)
        console.log("Wallet account changed", {
          wallet: controller.id,
          chains
        })
        void connect(wallets[0].type, chains)
      })

      if (type() && wallet() && chain() && isConnected()) {
        console.log("attempting to connect", type(), chain())
        void connect(type(), [chain()])
      }
    }
  })

  async function signArbitrary() {
    const wallet = wallets[chain()]
    if (!wallet) {
      alert("Wallet not connected yet")
      return
    }
    try {
      const res = await wallet.signArbitrary(SIGN_ARBITRARY_MSG)
      console.log(res)
      alert("Sign success! Check console logs for details.")
    } catch (err) {
      console.error(err)
      alert((err as Error).message)
    }
  }

  async function broadcastTx() {
    const wallet = wallets[chain()]
    if (!wallet) {
      alert("Wallet not connected yet")
      return
    }
    try {
      const tx: UnsignedTx = {
        msgs: [
          new MsgSend({
            fromAddress: wallet.address,
            toAddress: wallet.address,
            amount: [
              {
                denom: getDenom(chain()),
                amount: "1"
              }
            ]
          })
        ],
        memo: TX_MEMO
      }

      const fee = await wallet.estimateFee(tx)
      console.log("Tx fee:", fee)

      const txHash = await wallet.broadcastTx(tx, fee)
      console.log("Tx hash:", txHash)

      const { txResponse } = await wallet.pollTx(txHash)
      console.log("Tx response:", txResponse)

      alert(
        "Broadcast success!\n\nTx hash: " + txHash + "\n\nCheck console logs for details."
      )
    } catch (err) {
      console.error(err)
      alert((err as Error).message)
    }
  }

  return (
    <>
      <Nav />

      <main>
        <div class=" bg-gray-900 text-gray-100 flex flex-col items-center justify-center text-sm sm:text-base md:text-lg space-y-3 p-3">
          <div class="flex space-x-2"></div>

          <div class="flex space-x-2">
            <button
              class="bg-red-700 hover:bg-red-600 text-red-100 p-2 rounded"
              onClick={disconnect}
            >
              Disconnect
            </button>
            <button
              class="bg-green-700 hover:bg-green-600 text-green-100 p-2 rounded"
              onClick={() => connect(type(), [chain()])}
            >
              Connect
            </button>
          </div>

          <button
            class="bg-blue-800 hover:bg-blue-700 text-blue-100 p-2 rounded"
            onClick={signArbitrary}
          >
            Sign Arbitrary
          </button>

          <button
            class="bg-blue-800 hover:bg-blue-700 text-blue-100 p-2 rounded"
            onClick={broadcastTx}
          >
            Broadcast Tx
          </button>

          <div class="flex flex-col">
            <code>CONNECTED WALLETS</code>
            <For each={Object.values(wallets)}>
              {wallet => (
                <code>
                  {wallet.address.slice(0, 10)}
                  ...{wallet.address.slice(-5)} | {WALLETS[wallet.id]}
                </code>
              )}
            </For>
          </div>
        </div>
        <Route />
      </main>
    </>
  )
}

export default App
