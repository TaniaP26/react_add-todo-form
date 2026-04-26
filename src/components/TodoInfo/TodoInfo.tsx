import { UserInfo } from '../UserInfo';
import type { User } from '../UserInfo';

export type Todo = {
  id: number;
  title: string;
  user: User;
  completed: boolean;
};

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo {...user} />
    </article>
  );
};
