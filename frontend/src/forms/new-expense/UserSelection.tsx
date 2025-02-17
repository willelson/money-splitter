import { User } from "@/store/groupStore";
import { Check } from "lucide-react";

type UserSelection = {
  users: User[];
  selectedUsers: number[];
  selectUser: (userId: number) => void;
};

function UserSelection({ users, selectedUsers, selectUser }: UserSelection) {
  const usersLIs = users.map((user) => (
    <li key={`user-selection-${user.id}`}>
      <div
        onClick={() => selectUser(user.id)}
        className="flex cursor-pointer justify-between py-1"
      >
        <p>{user.name}</p>
        {selectedUsers.includes(user.id) && <Check />}
      </div>
    </li>
  ));

  return (
    <ul className="flex flex-col gap-4 rounded bg-muted p-2">{usersLIs}</ul>
  );
}

export default UserSelection;
