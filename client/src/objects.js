import automationImg from '../src/media/data-ms-illustration.jpeg';
import taskImg from '../src/media/illustration.png';
import manageImg from '../src/media/manage_apps.png';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const services = {
    taskManagement: {
      title: 'Efficiently Manage Multiple Tasks',
      description: `Assist in managing tasks by creating structures 
      that help you keep track of your tasks, with due dates and priority level.`,
      img: taskImg,
    },
    teamManagement: {
      title: 'Manage Teams and Assign Tasks',
      description: `Work as an organization or team by creating, 
      managing, and assign tasks to be completed by other contributors in your team.`,
      img: manageImg,
    },
    Automation: {
        title: 'Automate Tasks',
        description: `Automatically assign tasks to users based on their roles, 
        streamlining your workflow and ensuring efficient task distribution within your organization.`,
        img: automationImg,
      }
};

export const socialIcons = {
  linkedIn: {
      icon: <LinkedInIcon sx={{ color: 'white', fontSize: '1.5rem'}} />,
      link: 'https://www.linkedin.com'
  },
  instagram: {
      icon: <InstagramIcon sx={{ color: 'white', fontSize: '1.5rem'}} />,
      link: 'https://www.instagram.com'
  },
  facebook: {
      icon: <FacebookIcon sx={{ color: 'white', fontSize: '1.5rem'}} />,
      link: 'https://www.facebool.com'
  },
  twitter: {
      icon: <TwitterIcon sx={{ color: 'white', fontSize: '1.5rem'}} />,
      link: 'https://www.twitter.com'
  },
  youtube: {
      icon: <YouTubeIcon sx={{ color: 'white', fontSize: '1.5rem'}} />,
      link: 'https://www.youtube.com'
  },
};