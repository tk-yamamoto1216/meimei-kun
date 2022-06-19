import { SubmitHandler, useForm } from 'react-hook-form';
import './assets/styles/App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Inputs = {
  name: string;
  email: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.number().positive().integer().required(),
  })
  .required();

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: 'onChange', resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input className="input" placeholder="email" {...register('email')} />
        <p>{errors.email?.message}</p>
        <input className="input" placeholder="name" {...register('name')} />
        <p>{errors.name?.message}</p>

        <button className="input" type="submit">
          送信
        </button>
      </form>
    </div>
  );
}

export default App;
