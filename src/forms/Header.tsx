import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router";

type FormHeader = {
  children: React.ReactNode;
  backFunction?: () => void;
};

function FormHeader({ children, backFunction }: FormHeader) {
  const navigate = useNavigate();

  if (backFunction === undefined) {
    backFunction = () => navigate(-1);
  }

  return (
    <div className="mb-4 flex justify-between">
      <Button variant="ghost" onClick={backFunction}>
        <ArrowLeft /> Back
      </Button>
      {children}
    </div>
  );
}

export default FormHeader;
