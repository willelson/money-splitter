import { create } from "zustand";

export const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  selectedGroupId: 0,
  selectedGroup: null,
  loadingGroups: true,
  setGroups: (groups: Group[]) => set(() => ({ groups })),
  setSelectedGroup: (groupId: number) =>
    set((store) => {
    set(() => ({ selectedGroupId: groupId })),
      const group = store.groups.find((g) => g.id === groupId);
      if (group === undefined) {
        throw Error(`Group with id ${groupId} does not exist in the store`);
      }

      return { selectedGroupId: groupId, selectedGroup: group };
    }),
  addGroup: (group: Group) =>
    set((state) => ({ groups: [...state.groups, group] })),

  setLoadingGroups: (isLoading: boolean) =>
    set(() => ({ loadingGroups: isLoading })),
}));

type GroupStore = {
  groups: Group[];
  selectedGroupId: number | null;
  selectedGroup: Group | null;
  loadingGroups: boolean;
  setGroups: (groups: Group[]) => void;
  setSelectedGroup: (groupId: number) => void;
  addGroup: (group: Group) => void;
  setLoadingGroups: (isLoading: boolean) => void;
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
