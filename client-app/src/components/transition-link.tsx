import React from 'react';
import { FC } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface TransitionLinkProps {
  to: string;
  children: React.ReactElement<any>; // Children should be a React element
}

export const TransitionLink: FC<TransitionLinkProps> = (props) => {
  const { to, children} = props;
  const navigateTo = useNavigate();

  const navigate = (to: string) => {
    if (!document?.startViewTransition) {
        flushSync(() => {
            navigateTo(to);
        });
    } else {
      document.startViewTransition(async () => {
            await new Promise<void>((resolve) => {
                flushSync(() => {
                    navigateTo(to);
                    resolve();
                });
            });
        });
    }
  }

  return (
    <button onClick={() => navigate(to)}>{children}</button>
  );
};