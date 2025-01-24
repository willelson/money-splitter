import NavBar from "@/components/NavBar";

function GroupTransactions() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-[60vh] w-[350px] flex-col gap-4">
        GroupTransactions
        <div className="flex-1">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <NavBar />
      </div>
    </div>
  );
}

export default GroupTransactions;
