import helloWorld from './helloWorld';
import imgSrc from './assets/img.png';
import logoSvg from './assets/aiming.svg';
import style from './index.module.css';
import './index.css';
import './style.scss';

console.log(style);
helloWorld();

const img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);

const svg = document.createElement('img');
svg.style.cssText = 'width:400px; height:400px';
svg.src = logoSvg;
document.body.appendChild(svg);

const block = document.createElement('div');
block.textContent = 'exampleTxt';
block.classList.add(style.div);
block.classList.add('block-bg');
document.body.appendChild(block);

console.log('test');
