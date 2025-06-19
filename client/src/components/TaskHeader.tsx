import {
  LuCalendarArrowUp,
  LuCalendarClock,
  LuCircleCheck,
} from "react-icons/lu";
import { useLogout } from "../api/auth/logout";
import IconToggleButton from "./IconToggleButton";

export default function TaskHeader({
  showComplete,
  handleShowCompleteToggle,
  onlyOverdue,
  handleOnlyOverdueToggle,
  sortByDue,
  handleSortByDueToggle,
}: {
  showComplete: boolean;
  handleShowCompleteToggle: () => void;
  onlyOverdue: boolean;
  handleOnlyOverdueToggle: () => void;
  sortByDue: boolean;
  handleSortByDueToggle: () => void;
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
    <div className="flex flex-row py-2">
      <h1 className="ml-1.5 mt-2 font-bold w-10/12 text-2xl">Your Tasks</h1>
      <IconToggleButton /* Sort by due date */
        status={sortByDue}
        handleChange={handleSortByDueToggle}
        icon={<LuCalendarArrowUp />}
        tooltip="Sort by due date"
      />
      <IconToggleButton /* Show only overdue tasks */
        status={onlyOverdue}
        handleChange={handleOnlyOverdueToggle}
        icon={<LuCalendarClock />}
        tooltip="Overdue tasks"
      />
      <IconToggleButton /* Include completed tasks */
        status={showComplete}
        handleChange={handleShowCompleteToggle}
        icon={<LuCircleCheck />}
        tooltip="Show completed tasks"
      />
      <button
        type="button"
        className="btn-secondary mx-1.5 px-2 max-h-10"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </div>
  );
}
