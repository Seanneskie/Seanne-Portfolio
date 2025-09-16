import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { useData, type UseDataResult } from "./use-data";

interface HookTestProps<T> {
  file: string;
  onRender: (result: UseDataResult<T>) => void;
}

function HookTestComponent<T>({ file, onRender }: HookTestProps<T>): React.ReactElement | null {
  const result = useData<T>(file);

  React.useEffect(() => {
    onRender(result);
  }, [result, onRender]);

  return null;
}

async function flushPromises(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
}

(globalThis as { React?: typeof React }).React = React;

describe("useData", () => {
  const originalFetch = global.fetch;
  const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;

    if (typeof originalBasePath === "undefined") {
      delete process.env.NEXT_PUBLIC_BASE_PATH;
    } else {
      process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath;
    }
  });

  it("loads JSON data and updates state when the request succeeds", async () => {
    interface ExampleData {
      message: string;
    }

    const mockData: ExampleData = { message: "Hello" };

    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );

    global.fetch = fetchMock;

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    let latest: UseDataResult<ExampleData> | undefined;
    const handleRender = (value: UseDataResult<ExampleData>): void => {
      latest = value;
    };

    await act(async () => {
      root.render(
        <HookTestComponent<ExampleData>
          file="example.json"
          onRender={handleRender}
        />
      );
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const callArgs = fetchMock.mock.calls[0];
    expect(callArgs?.[0]).toBe("/data/example.json");
    const init = callArgs?.[1] as RequestInit | undefined;
    expect(init?.signal).toBeInstanceOf(AbortSignal);

    await act(async () => {
      await flushPromises();
    });

    expect(latest?.data).toEqual(mockData);
    expect(latest?.loading).toBe(false);
    expect(latest?.error).toBeNull();

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("aborts the request when the component unmounts", async () => {
    let capturedSignal: AbortSignal | undefined;

    const fetchMock = vi.fn<typeof fetch>((_input, init) => {
      capturedSignal = init?.signal ?? undefined;

      return new Promise<Response>((_resolve, reject) => {
        capturedSignal?.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
    });

    global.fetch = fetchMock;

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    let latest: UseDataResult<Record<string, never>> | undefined;
    const handleRender = (value: UseDataResult<Record<string, never>>): void => {
      latest = value;
    };

    await act(async () => {
      root.render(
        <HookTestComponent<Record<string, never>>
          file="slow.json"
          onRender={handleRender}
        />
      );
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(capturedSignal).toBeInstanceOf(AbortSignal);
    expect(capturedSignal?.aborted).toBe(false);
    expect(latest?.loading).toBe(true);
    expect(latest?.error).toBeNull();

    await act(async () => {
      root.unmount();
    });

    expect(capturedSignal?.aborted).toBe(true);

    container.remove();
  });
});
