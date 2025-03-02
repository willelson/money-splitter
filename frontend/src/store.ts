import { create } from "zustand";

type SidebarStore = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: window.matchMedia("(min-width: 768px)").matches,
  setOpen: (newOpenState: boolean) => set(() => ({ open: newOpenState })),
}));
