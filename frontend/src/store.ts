import { create } from "zustand";

type SidebarStore = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: true,
  setOpen: (newOpenState: boolean) => set(() => ({ open: newOpenState })),
}));
