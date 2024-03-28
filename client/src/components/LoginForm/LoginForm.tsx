import {FC, FormEventHandler, useState} from 'react'
import {useMutation} from "@tanstack/react-query";
import { v4 as uuidv4 } from 'uuid';
import {FormField} from '../FormField';
import {Button} from '../Button';
import './LoginForm.css';
import {IErrorItem, login, loginSchema} from "../../api/User.ts";
import {queryClient} from "../../api/queryClient.ts";
import translate from "translate";

export const LoginForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);

  const loginMutation = useMutation({
    mutationFn: () => login(loginSchema.parse({username, password})),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["users", "me"]});
    },
    onError: (data) => {
      setError(() => []);
      JSON.parse(data.message).map((item: IErrorItem) => {
        translate(item.message as string, "ru").then(item => {
          setError((elem) => [...elem, item])
        })
      })
    }
  }, queryClient)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  return (
      <form className="login-form" onSubmit={handleSubmit}>
        <FormField label="Имя пользователя">
          <input
              type="text"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
          />
        </FormField>
        <FormField label="Пароль">
          <input
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
          />
        </FormField>

        {/*{loginMutation.error && <span>{loginMutation.error.message}</span>}*/}
        {error && <ul className="registration-form__error"> {error.map((item) => <li key={uuidv4()}>{item}</li>)} </ul>}

        <Button type="submit" title="Войти" isLoading={loginMutation.isPending}/>
      </form>
  );
};
