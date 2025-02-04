import { useGroupStore } from "@/store/groupStore";

type Groups = {
  className?: string;
};

function Groups({ className }: Groups) {
  const { groups, selectedGroupId, setSelectedGroup } = useGroupStore();

  return (
    <div
      className={`flex flex-col gap-4 rounded bg-primary-foreground p-3 ${className}`}
    >
      <p className="text-sm text-muted-foreground">GROUPS</p>

      {groups.map((group) => {
        const groupSize = group.users.length;
        const isSelected = group.id === selectedGroupId;

        return (
          <div
            className="hover:cursor-pointer"
            onClick={() => setSelectedGroup(group.id)}
          >
            <p className={`${isSelected ? "text-accent-foreground" : ""}`}>
              {group.title}
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
