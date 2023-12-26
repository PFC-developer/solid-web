import { Link } from "@solidjs/router"
import { For, Show } from "solid-js"
import { CHAINS, TYPES, WALLETS } from "../connect/constants"

import {
  chain,
  connect,
  connectedWallet,
  disconnect,
  setChain,
  setType,
  setWallet,
  type,
  wallet
} from "../stores/createWalletStore"
import { WalletName, WalletType } from "cosmes/wallet"

export default function Nav() {
  return (
    <nav class="bg-gray-200 text-gray-900 px-4">
      <ul class="flex items-center">
        <li class="py-2 px-4">
          <Link href="/" class="no-underline hover:underline">
            Home
          </Link>
        </li>
        <li class="py-2 px-4">
          <Link href="/about" class="no-underline hover:underline">
            About
          </Link>
        </li>

        <li class="text-sm flex items-center ml-auto">
          <select
            class="bg-gray-700 rounded p-2 text-gray-200"
            value={wallet()}
            onChange={e => {
              disconnect()
              setWallet(e.target.value as WalletName)
            }}
          >
            <For each={Object.keys(WALLETS)}>
              {wallet => <option value={wallet}>{WALLETS[wallet as WalletName]}</option>}
            </For>
          </select>
        </li>
        <li class="text-sm  items-center">
          <select
            class="bg-gray-700 rounded p-2 text-gray-200"
            value={type()}
            onChange={e => {
              disconnect()
              setType(e.target.value as WalletType)
            }}
          >
            <For each={Object.keys(TYPES)}>
              {type => <option value={type}>{TYPES[type as WalletType]}</option>}
            </For>
          </select>
        </li>
        <li class="text-sm flex items-center">
          <select
            class="bg-gray-700 rounded p-2 text-gray-200"
            value={chain()}
            onChange={e => {
              setChain(e.target.value)
              void connect(type(), [chain()])
            }}
          >
            <For each={Object.keys(CHAINS)}>
              {id => <option value={id}>{CHAINS[id]}</option>}
            </For>
          </select>
        </li>
        <Show
          when={connectedWallet()}
          fallback={
            <li class="text-sm flex items-center m-1 bg-red-50 space-x-1">
              <span>Not Connected</span>
            </li>
          }
        >
          <li class="text-sm flex items-center m-1 bg-green-300 space-x-1">
            <span>
              {connectedWallet().address.slice(0, 10)}
              ...{connectedWallet().address.slice(-5)}
            </span>
          </li>
        </Show>
      </ul>
    </nav>
  )
}
