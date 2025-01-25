import { Button } from "@/components/ui/button";

function LandingPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-[70vh] w-[350px] flex-col gap-4">
        <Button variant="secondary">New Group</Button>
        <Button variant="secondary">Join Group</Button>
      </div>
    </div>
  );
}

export default LandingPage;
