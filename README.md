# Sorokit UI (`@sorokit/ui`)

A small React UI kit for Stellar and Soroban dApps, with wallet connection primitives and transaction feedback powered by `@sorokit/core`.

## Features

- **ConnectButton:** Calls `useWallet()` and shows connect, connecting, connected, copy, and disconnect states.
- **TransactionToast:** Renders pending, success, and error transaction state from `useContract()`.
- **AddressChip:** Truncated address display with click-to-copy confirmation text.
- **NetworkBadge:** Current network display with mismatch warning support.

## Install

```bash
pnpm add @sorokit/ui @sorokit/core
```

## Setup

Include Sorokit UI source in your Tailwind content paths:

```js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@sorokit/ui/dist/**/*.js",
  ],
};
```

There is no stylesheet to import. Components use plain Tailwind utility classes and can be customized with `className`.

Use the components directly:

```tsx
import { ConnectButton } from "@sorokit/ui";

export function App() {
  return <ConnectButton walletId="freighter" />;
}
```

## Local development

This repo depends on a local, unpublished `@sorokit/core` via `file:../sorokit-core`
in `devDependencies`. It intentionally opts out of pnpm workspace mode
(`.npmrc` → `ignore-workspace=true`) — workspace-protocol linking
(`workspace:*`, `pnpm --filter`, `pnpm -w list`) was unreliable in this repo's
setup and silently no-op'd instead of erroring, so `file:` + `--ignore-workspace`
is the supported path. If you clone this repo elsewhere, make sure
`sorokit-core` is checked out as a sibling folder (`../sorokit-core` relative
to this repo) before running `pnpm install`.

## Transaction Feedback

Drive `TransactionToast` from `@sorokit/core`:

```tsx
import { useContract } from "@sorokit/core";
import { TransactionToast } from "@sorokit/ui";

export function SubmitButton() {
  const { status, error, call } = useContract("CONTRACT_ID");

  return (
    <>
      <button onClick={() => call()}>Submit</button>
      <TransactionToast status={status} error={error} successMessage="Transaction confirmed" />
    </>
  );
}
```

## Dark Mode

Toggle the `dark` class on `<html>` or any ancestor element. Components include Tailwind `dark:` variants and make no hardcoded background assumption.

## Theme

See [THEME.md](./THEME.md) for the accent color and semantic color conventions.
