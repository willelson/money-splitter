import NavBar from "@/components/navbar/NavBar";
import { useGroupStore } from "@/store/groupStore";
function generateRandomNumber(): number {
  const random = Math.random() * 1000;
  return parseFloat(random.toFixed(2));
}

function GroupOverview() {
  const { selectedGroup } = useGroupStore();

  if (selectedGroup === null) return <p>group error</p>;

  return (
    <div className="flex h-full flex-col gap-2">
      <div>
        <h1 className="text-lg">{selectedGroup.name}</h1>
        <p className="text-md mt-4 font-extralight text-muted-foreground">
          BALANCE
        </p>
      </div>
      <div className="flex-1">
        <ul className="flex flex-col gap-4 rounded bg-muted p-2">
          {selectedGroup.users.map((user, index) => (
            <div
              className="flex justify-between py-1"
              key={`group-user-${index}`}
            >
              <p>{user.name}</p>
              <p>€{generateRandomNumber()}</p>
            </div>
          ))}
        </ul>
      </div>
      <NavBar />
    </div>
  );
}

export default GroupOverview;
