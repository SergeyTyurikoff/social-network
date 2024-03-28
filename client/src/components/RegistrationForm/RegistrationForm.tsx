import {FC, FormEventHandler, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import translate from "translate";
import {FormField} from '../FormField';
import {Button} from '../Button';
import './RegistrationForm.css';
import {useMutation} from "@tanstack/react-query";
import {IErrorItem, registerUser, registerUserSchema} from "../../api/User.ts";
import {queryClient} from "../../api/queryClient.ts";

export const RegistrationForm: FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);

  const registerMutation = useMutation({
    mutationFn: () => registerUser(registerUserSchema.parse({email, username, password})),
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
    },
  }, queryClient)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    registerMutation.mutate();
  };

  return (
      <form className="registration-form" onSubmit={handleSubmit}>
        <FormField label="Почта">
          <input
              type="text"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
          />
        </FormField>
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
        {/* {registerMutation.error && registerMutation.error.message}*/}
        {error && <ul className="registration-form__error"> {error.map((item) => <li key={uuidv4()}>{item}</li>)} </ul>}
        <Button
            type="submit"
            title="Зарегистрироваться"
            isLoading={registerMutation.isPending}
        />
      </form>
  );
};
