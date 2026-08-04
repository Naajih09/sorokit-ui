import { useCallback, useState } from "react";
import { useContract as useCoreContract } from "@sorokit/core";

/**
 * @sorokit/core's useContract({ contractId, networkConfig }) returns raw
 * SDK handles (`contract`, `server`) and does no state management. This
 * hook is sorokit-ui's layer on top: it owns call status/result/error so
 * components (and the toast system) have something to render against.
 *
 * TODO: confirm the actual invocation method on the raw `contract` handle
 * from sorokit-core/src/hooks/useContract.ts (e.g. contract.call(...),
 * contract.invoke(...)) and swap the placeholder call below to match.
 */
export type CallStatus = "idle" | "pending" | "success" | "error";

export interface UseContractCallOptions {
  contractId: string;
  networkConfig: unknown; // TODO: type against core's real NetworkConfig
}

export function useContractCall<TResult = unknown>({
  contractId,
  networkConfig,
}: UseContractCallOptions) {
  const { contract, server } = useCoreContract({ contractId, networkConfig });

  const [status, setStatus] = useState<CallStatus>("idle");
  const [result, setResult] = useState<TResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async (method: string, ...args: unknown[]) => {
      setStatus("pending");
      setError(null);
      try {
        // Placeholder — replace with core's actual invocation call once
        // confirmed. Kept generic so this compiles against an unknown
        // contract shape without guessing a wrong method name silently.
        const invoke = (contract as { call?: (m: string, ...a: unknown[]) => Promise<TResult> })
          .call;
        if (!invoke) {
          throw new Error(
            "useContractCall: confirm the invocation method on core's contract handle"
          );
        }
        const value = await invoke.call(contract, method, ...args);
        setResult(value);
        setStatus("success");
        return value;
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Contract call failed");
        throw err;
      }
    },
    [contract]
  );

  return { status, result, error, call, contract, server };
}
