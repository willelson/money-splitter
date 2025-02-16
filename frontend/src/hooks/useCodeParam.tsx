import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGroupStore } from "@/store/groupStore";

/**
 * This hook has to be used in every component that uses the code url parameter
 * it checks if groups have finished loading, then sets the selcted group in zustand
 * store based on the code in the url
 */
export function useCodeParam() {
  const { code } = useParams();
  const { groups, loadingGroups, setSelectedGroup, selectedGroup } =
    useGroupStore();

  useEffect(() => {
    if (loadingGroups === false && selectedGroup === null) {
      // TODO: handle case where groups is empty

      const group = groups.find((g) => g.code === code);

      if (group === undefined) {
        // TODO: redirect to 404 page or error or something
        console.warn("group from url params not found in loaded groups");
      } else {
        setSelectedGroup(group.id);
      }
    }
  }, [loadingGroups]);

  return { code };
}
