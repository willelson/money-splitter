import { create } from "zustand";

import dummyGroupStore from "./dummyGroupStore";

export const useGroupStore = create<GroupStore>((set) => ({
  groups: dummyGroupStore,
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

type Group = {
  id: number;
  title: string;
  code: string;
  created_at: Date;
  users: User[];
};

type User = {
  id: number;
  groupId: number;
  name: string;
  created_at: Date;
};
