function Expense() {
  return (
    <div className="border-b px-1 py-2">
      <div className="flex justify-between">
        <div>
          <p>expense title</p>
          <p className="text-muted-foreground">user name</p>
        </div>
        <p>€14,49</p>
      </div>
    </div>
  );
}

export default Expense;
