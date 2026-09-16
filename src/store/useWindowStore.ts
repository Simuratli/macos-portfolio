import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type WindowKey = keyof typeof WINDOW_CONFIG;

type WindowState = {
  isOpen: boolean;
  zIndex: number;
  data: unknown;
};

type WindowStore = {
  windows: Record<WindowKey, WindowState>;
  nextZindex: number;
  openWindow: (windowKey: WindowKey, data?: unknown) => void;
  closeWindow: (windowKey: WindowKey, data?: unknown) => void;
  focusWindow: (windowKey: WindowKey) => void;
};

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZindex: INITIAL_Z_INDEX,
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = true;
        win.zIndex = state.nextZindex;
        win.data = data ?? win.data;
        state.nextZindex += 1;
      }),
    closeWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = data ?? win.data;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.zIndex = state.nextZindex++;
      }),
  })),
);

export default useWindowStore;
