import { ReactNode } from 'react';
import { GithubIcon, LinkedinIcon, TelegramIcon, TwitterIcon } from '@/components/icons';

export const socialMediaLinks: {
  component: ReactNode;
  className: string;
  url: string;
}[] = [
  {
    component: <TelegramIcon />,
    className: 'telegram',
    url: 'https://t.me/+AykW-ePjG9ZjNzE0',
  },
  {
    component: <LinkedinIcon />,
    className: 'linkedin',
    url: 'http://www.linkedin.com/in/lefeef-d-ups-813393310',
  },
  {
    component: <TwitterIcon />,
    className: 'twitter',
    url: 'https://x.com/lefeef2024',
  },
  {
    component: <GithubIcon />,
    className: 'github',
    url: 'https://github.com/lefeef2024',
  },
];
