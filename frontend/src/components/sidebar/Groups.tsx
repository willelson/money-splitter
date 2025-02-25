import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useSidebarStore } from "@/store";
import { useGroupStore } from "@/store/groupStore";
import GroupsSkeleton from "./GroupsSkeleton";

type Groups = {
  className?: string;
};

function Groups({ className }: Groups) {
  const { groups, selectedGroupId, setSelectedGroup, loadingGroups } =
    useGroupStore();
  const { setOpen } = useSidebarStore();
  const navigate = useNavigate();

  const isMobile = !window.matchMedia("(min-width: 768px)").matches;

  const selectGroup = (groupId: number, groupCode: string) => {
    setSelectedGroup(groupId);
    if (isMobile) setOpen(false);
    navigate(`/group/${groupCode}/overview`);
  };

  const addGroup = () => {
    if (isMobile) setOpen(false);
    navigate("/");
  };

  return (
    <div
      className={`flex max-h-[55vh] flex-col gap-4 overflow-auto rounded bg-primary-foreground p-3 ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">GROUPS</p>
        <Plus
          className="text-secondary-foreground hover:cursor-pointer"
          onClick={addGroup}
        />
      </div>

      {loadingGroups && groups.length === 0 ? (
        <GroupsSkeleton />
      ) : (
        groups.map((group) => {
          const groupSize = group.users.length;
          const isSelected = group.id === selectedGroupId;

          return (
            <div
              key={group.id}
              className="hover:cursor-pointer"
              onClick={() => selectGroup(group.id, group.code)}
            >
              <p className={`${isSelected ? "text-accent-foreground" : ""}`}>
                {group.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {groupSize} Person{groupSize > 1 ? "s" : ""}
              </p>
            </div>
          );
        })
      )}

      {groups.length === 0 && !loadingGroups && (
        <div className="text-light text-sm text-muted-foreground">
          No groups yet...
        </div>
      )}
    </div>
  );
}

export default Groups;
