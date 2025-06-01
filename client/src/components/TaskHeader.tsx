import { useLogout } from "../api/auth/logout";

export default function TaskHeader() {
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

  return (
    <div className="flex flex-row">
      <h1 className="ml-1.5 mt-1 font-bold w-11/12">Tasks</h1>
      <button type="button" className="btn-primary" onClick={handleLogoutClick}>
        <p className="mx-2">Logout</p>
      </button>
    </div>
  );
}
