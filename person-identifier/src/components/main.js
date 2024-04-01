import personImg from '../assets/person.png';
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from 'react-icons/fa';

const Main = () => {
  return (
    <div className='bg-emerald-100 py-24'>
      <div className='align-element grid md:grid-cols-2 items-center gap-8'>
        <article>
          <h1 className='text-6xl font-bold tracking-wider'>Welcome Here,</h1>
          <p className='mt-4 text-lg text-slate-700 capitalize tracking-wide'>
            Harnessing the power of Computer Vision and Deep Learning, our platform sets
            a new standard in Person Identification based on Unique Gait and Actions
          </p>
          <div className='flex gap-x-4 mt-4'>
            <a href='https://www.github.com' target='blank'>
              <FaGithubSquare className='h-8 w-8 text-slate-500 hover:text-black duration-300' />
            </a>
            <a href='https://www.linkedin.com' target='blank'>
              <FaLinkedin className='h-8 w-8 text-slate-500 hover:text-black duration-300' />
            </a>
            <a href='https://www.facebook.com' target='blank'>
              <FaFacebookSquare className='h-8 w-8 text-slate-500 hover:text-black duration-300' />
            </a>
          </div>
        </article>
        <article className='hidden md:block'>
          <img src={personImg} alt='img...' className='h-80 lg:h-96' />
        </article>
      </div>
    </div>
  );
};
export default Main;
