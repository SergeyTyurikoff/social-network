import {FC, FormEventHandler, useState} from 'react'
import {useMutation} from "@tanstack/react-query";

import {FormField} from '../FormField';
import {Button} from '../Button';
import './LoginForm.css';
import {login, loginSchema} from "../../api/User.ts";
import {queryClient} from "../../api/queryClient.ts";

export const LoginForm: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useMutation({
        mutationFn: () => login(loginSchema.parse({username, password})),
        onSuccess() {
          queryClient.invalidateQueries({queryKey: ["users", "me"]});
        },
    }, queryClient)

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
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

            {loginMutation.error && <span>{loginMutation.error.message}</span>}

            <Button type="submit" title="Войти" isLoading={loginMutation.isPending}/>
        </form>
    );
};
