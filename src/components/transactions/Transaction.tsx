function Transaction() {
  return (
    <div className="border-b px-1 py-2">
      <div className="flex justify-between">
        <div>
          <p>
            <span className="text-muted-foreground">From</span>{" "}
            <span>sender</span>
          </p>

          <p>
            <span className="text-muted-foreground">To</span>{" "}
            <span>recipient</span>
          </p>
        </div>
        <p>€52,83</p>
      </div>
    </div>
  );
}

export default Transaction;
