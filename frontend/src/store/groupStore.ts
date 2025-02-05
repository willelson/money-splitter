import { create } from "zustand";

export const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  selectedGroupId: 0,
  setGroups: (groups: Group[]) => set(() => ({ groups })),
  setSelectedGroup: (groupId: number) =>
    set(() => ({ selectedGroupId: groupId })),
  addGroup: (group: Group) =>
    set((state) => ({ groups: [...state.groups, group] })),
}));

type GroupStore = {
  groups: Group[];
  selectedGroupId: number;
  setGroups: (groups: Group[]) => void;
  setSelectedGroup: (groupId: number) => void;
  addGroup: (group: Group) => void;
};

export type Group = {
  id: number;
  name: string;
  code: string;
  created_at: string;
  users: User[];
};

type User = {
  id: number;
  group_id: number | null;
  name: string;
  created_at: string;
  active: boolean;
};
