import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Footer() {
  return (
    <div className='footer'>
      <p>© 2021 Gonzalo Pereira</p>
      <LinkedInIcon onClick={() => window.open('https://www.linkedin.com/in/gonzalo-pereira-ramirez-8818a5195/')} />
      <GitHubIcon onClick={() => window.open('https://github.com/GonzaloPereira/graph-visualizer')} />
    </div>
  );
}
