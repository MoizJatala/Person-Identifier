import aboutSvg from '../assets/about.svg';
import SectionTitle from './SectionTitle';
const About = () => {
  return (
    <section className='bg-white py-20' id='about'>
      <div className='align-element grid md:grid-cols-2 items-center gap-16'>
        <img src={aboutSvg} alt='img...' className='w-full h-64' />
        <article>
          <SectionTitle text='About Person-Identifier' />
          <p className='text-slate-600 mt-8 leading-loose'>
          At Person-Identifier, we are driven by a passion for pioneering technological solutions that redefine the landscape of security and identification. Our journey began with a vision to create a world where cutting-edge advancements in artificial intelligence make a tangible impact on people's lives.
          </p>
        </article>
      </div>
    </section>
  );
};
export default About;
