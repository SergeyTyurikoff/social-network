import { Button } from '../Button';
import {useMutation} from "@tanstack/react-query";
import {logout} from "../../api/User.ts";
import {queryClient} from "../../api/queryClient.ts";
import {FormEventHandler} from "react";

export const LogoutButton = () => {

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["users", "me"]});
    },
  }, queryClient)

  const handleClick: FormEventHandler<HTMLButtonElement> = () => {
    logoutMutation.mutate();
  }

  return (
      <>
        <Button type="button" title="Выйти" isLoading={logoutMutation.isPending} variant="secondary" size="small" onClick={handleClick}/>
        {logoutMutation.error && <p>{logoutMutation.error.message}</p>}
      </>
  );
};
