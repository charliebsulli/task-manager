import { useLogout } from "../api/auth/logout";
import OverdueToggle from "./OverdueToggle";
import StatusToggle from "./StatusToggle";

export default function TaskHeader({
  showComplete,
  handleShowCompleteToggle,
  onlyOverdue,
  handleOnlyOverdueToggle,
}: {
  showComplete: boolean;
  handleShowCompleteToggle: () => void;
  onlyOverdue: boolean;
  handleOnlyOverdueToggle: () => void;
}) {
  // const router = useRouter();
  const logoutMutation = useLogout();

  function handleLogoutClick() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.clear();
        window.location.href = "/auth/login";
        // am not using client side routing here because main page must reload
        // to fetch tasks for a new user - an issue to fix in the future
      },
      onError: () => {
        console.log("Failed to logout");
      },
    });
  }

  // not sure it makes sense for the task header to contain all of these components
  return (
    <div className="flex flex-row">
      <h1 className="ml-1.5 mt-1 font-bold w-8/12">Tasks</h1>
      <OverdueToggle
        onlyOverdue={onlyOverdue}
        handleChange={handleOnlyOverdueToggle}
      />
      <StatusToggle
        showComplete={showComplete}
        handleChange={handleShowCompleteToggle}
      />
      <button
        type="button"
        className="btn-primary mx-1.5 px-2"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </div>
  );
}
