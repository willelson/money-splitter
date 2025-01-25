import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <Button variant="secondary" onClick={() => navigate("/new-group")}>
        New Group
      </Button>
      <Button variant="secondary" onClick={() => navigate("/join-group")}>
        Join Group
      </Button>
    </div>
  );
}

export default LandingPage;
