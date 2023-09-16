import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
}

export const TransitionLink: FC<TransitionLinkProps> = (props) => {
  const { to, children } = props;
  const navigateTo = useNavigate();

  const navigate = (to: string) => {
    if (!document?.startViewTransition) {
      navigateTo(to);
    } else {
      document.startViewTransition(async () => {
        await navigateTo(to);
      });
    }
  }

  return (
    <button onClick={() => navigate(to)}>{children}</button>
  );
};