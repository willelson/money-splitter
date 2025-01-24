import NavBar from "@/components/navbar/NavBar";

function GroupOverview() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-[60vh] w-[350px] flex-col gap-4">
        GroupOverview
        <div className="flex-1">
          <ul>
            <li>a</li>
            <li>b</li>
            <li>c</li>
          </ul>
        </div>
        <NavBar />
      </div>
    </div>
  );
}

export default GroupOverview;
