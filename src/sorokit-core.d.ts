declare module '@sorokit/core' {
  export type SorobanNetwork = 'testnet' | 'mainnet' | 'futurenet';
  export type WalletId = 'freighter' | 'albedo' | 'xbull';

  export interface WalletState {
    isConnected: boolean;
    isConnecting: boolean;
    address?: string;
    network?: SorobanNetwork;
    walletId?: WalletId;
    error?: unknown;
    connect: () => void | Promise<void>;
    disconnect: () => void | Promise<void>;
  }

  export type ContractStatus = 'idle' | 'pending' | 'success' | 'error';

  export interface ContractState<TResult> {
    status: ContractStatus;
    result?: TResult;
    error?: unknown;
    call: (...args: unknown[]) => Promise<TResult>;
  }

  export function useWallet(preferred?: WalletId): WalletState;
  export function useContract<TResult>(contractId: string): ContractState<TResult>;
}
