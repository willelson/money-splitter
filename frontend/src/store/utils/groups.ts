import { Group } from "@/store/groupStore";
import { client } from "@/trpc";

const GROUP_STORAGE_KEY = "expense-group-codes";

/**
 * Fetch groups codes saved in local storage
 */
export const loadLocalGroupCodes = () =>
  JSON.parse(localStorage.getItem(GROUP_STORAGE_KEY) || "[]") as string[];

/**
 * Add a new code to locally saved codes
 */
export const saveGroupCodeLocally = (newCode: string) => {
  // read current group codes from zustand store or ffrom local storage?
  const existingCodes = loadLocalGroupCodes();

  localStorage.setItem(
    GROUP_STORAGE_KEY,
    JSON.stringify([...existingCodes, newCode]),
  );
};

export const generateCode = () => Math.random().toString(36).slice(2, 14);

export const getGroupsFromLocalStorageCodes = async () => {
  const savedGroupCodes = loadLocalGroupCodes();

  const groups: Group[] = await Promise.all(
    savedGroupCodes.map((code) => client.groups.get.query({ code })),
  );

  return groups;
};
