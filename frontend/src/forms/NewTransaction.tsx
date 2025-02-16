import FormHeader from "@/forms/Header";
import { useCodeParam } from "@/hooks/useCodeParam";

function NewTransaction() {
  useCodeParam();
  return (
    <div>
      <FormHeader></FormHeader>
      NewTransaction
    </div>
  );
}

export default NewTransaction;
