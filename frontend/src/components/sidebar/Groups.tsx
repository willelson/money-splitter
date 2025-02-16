import { useGroupStore } from "@/store/groupStore";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Groups = {
  className?: string;
};

function Groups({ className }: Groups) {
  const { groups, selectedGroupId, setSelectedGroup } = useGroupStore();
  const navigate = useNavigate();

  const selectGroup = (groupId: number, groupCode: string) => {
    setSelectedGroup(groupId);
    navigate(`/group/${groupCode}/overview`);
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded bg-primary-foreground p-3 ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">GROUPS</p>
        <Plus
          className="text-secondary-foreground hover:cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {groups.map((group) => {
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
      })}
    </div>
  );
}

export default Groups;
