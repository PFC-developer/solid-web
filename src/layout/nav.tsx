import { Link } from "@solidjs/router"
import { For, Show } from "solid-js"
import { CHAINS } from "../connect/constants"

import {
  chain,
  connect,
  connectedWallet,
  setChain,
  type
} from "../stores/createWalletStore"

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
        <li class="py-2 px-4">
          <Link href="/error" class="no-underline hover:underline">
            Error
          </Link>
        </li>
        <li class="text-sm flex items-center ml-auto">
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
            <li>
              <span>Not Connected</span>
            </li>
          }
        >
          <li>
            <span>
              Connected: {connectedWallet().address}/ {connectedWallet().id}
            </span>
          </li>
        </Show>
        <li class="text-sm flex items-center space-x-1 ml-auto">
          <span>URL:</span>
          <input
            class="w-75px p-1 bg-white text-sm rounded-lg"
            type="text"
            readOnly
            value={location.pathname}
          />
        </li>
      </ul>
    </nav>
  )
}
