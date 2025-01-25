import NavBar from "@/components/navbar/NavBar";

function GroupOverview() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div>
        <h1 className="text-lg">Group Title</h1>
        <p className="text-muted-foreground text-md mt-4 font-extralight">
          BALANCE
        </p>
      </div>
      <div className="flex-1">
        <ul className="bg-muted flex flex-col gap-4 rounded p-2">
          <div className="flex justify-between py-1">
            <p>User A</p>
            <p>€52,83</p>
          </div>
          <div className="flex justify-between py-1">
            <p>User B</p>
            <p>-€52,83</p>
          </div>
        </ul>
      </div>
      <NavBar />
    </div>
  );
}

export default GroupOverview;
