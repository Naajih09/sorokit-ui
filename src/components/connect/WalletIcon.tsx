import type { WalletId } from "@sorokit/core";

const ICONS: Record<WalletId, string> = {
  freighter: "/icons/freighter.svg",
  albedo: "/icons/albedo.svg",
  xbull: "/icons/xbull.svg",
} as Record<WalletId, string>;

export interface WalletIconProps {
  walletId: WalletId;
  size?: number;
}

/**
 * Bundle actual wallet SVGs under src/assets/icons and import them directly
 * (e.g. `import freighterIcon from "../../assets/icons/freighter.svg"`) so
 * they ship inside dist/ rather than depending on consumer-hosted paths.
 * Left as a path lookup here as a placeholder until assets are added.
 */
export function WalletIcon({ walletId, size = 20 }: WalletIconProps) {
  const src = ICONS[walletId];
  return (
    <img
      src={src}
      alt=""
      role="presentation"
      width={size}
      height={size}
      className="shrink-0"
    />
  );
}
