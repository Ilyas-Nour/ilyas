import { useEffect } from 'react';

export const useConsoleIdentity = () => {
  useEffect(() => {
    // Tightened ASCII art with minimal horizontal gap
    const asciiArt = `██╗██╗     ██╗   ██╗ █████╗ ███████╗ ███╗   ██╗ ██████╗ ██╗   ██╗██████╗ 
██║██║     ╚██╗      ██╔══██╗██╔════╝ ████╗  ██║██╔═══██╗██║   ██║██╔══██╗
██║██║      ╚████╔╝  ███████║███████╗ ██╔██╗ ██║██║   ██║██║   ██║██████╔╝
██║██║       ╚██╔╝   ██╔══██║╚════██║ ██║╚██╗██║██║   ██║██║   ██║██╔══██╗
██║███████╗   ██║    ██║  ██║███████║ ██║ ╚████║╚██████╔╝╚██████╔╝██║  ██║
╚═╝╚══════╝   ╚═╝    ╚═╝  ╚═╝╚══════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝`.trim();

    const asciiStyle = `
      color: #7000ff;
      background: linear-gradient(90deg, #7000ff, #00eeff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 10px;
      font-weight: 900;
      font-family: 'Courier New', monospace;
      line-height: 1.0;
    `;

    const titleStyle = `
      color: #00eeff;
      font-size: 14px;
      font-weight: bold;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      text-transform: uppercase;
    `;

    const bioStyle = `
      color: #eee;
      font-size: 13px;
      font-family: 'Courier New', monospace;
      line-height: 1.4;
    `;

    const linkLabelStyle = `
      color: #888;
      font-size: 12px;
      font-family: 'Courier New', monospace;
    `;

    const linkValueStyle = `
      color: #00eeff;
      font-size: 12px;
      font-family: 'Courier New', monospace;
      text-decoration: underline;
    `;

    const separatorStyle = `color: #222;`;
    const separator = '-'.repeat(60);

    console.log(`%c${asciiArt}`, asciiStyle);
    console.log('%cFull-Stack Web Developer', titleStyle);
    console.log('%c' + separator, separatorStyle);
    console.log('%cEngineering elegant digital architecture where clean aesthetics\nmeet technical excellence. Based at the intersection of design and logic.', bioStyle);
    console.log('%c' + separator, separatorStyle);
    console.log('%cGitHub:   %chttps://github.com/Ilyas-Nour', linkLabelStyle, linkValueStyle);
    console.log('%cLinkedIn: %chttps://linkedin.com/in/ilyas-nour', linkLabelStyle, linkValueStyle);
    console.log('%cPortfolio:%chttps://ilyas-nour.dev', linkLabelStyle, linkValueStyle);
    console.log('%c' + separator, separatorStyle);
    console.log('%cWelcome to the source. Hack the planet.', 'color: #7000ff; font-style: italic; font-size: 11px;');
  }, []);
};
