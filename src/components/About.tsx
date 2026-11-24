import avatar from '../assets/avatar.jpg'
import { ethos } from '../data/cv'
import Reveal from './Reveal'

export default function About() {
  return (
    <section
      id="about"
      className="section section--light"
      data-theme="light"
      aria-labelledby="about-title"
    >
      <div className="section__inner">
        <Reveal className="section__head" variant="title">
          <h2 id="about-title" className="section__title">
            About me
          </h2>
          <p className="section__lede">How I work, and where that comes from.</p>
        </Reveal>

        <div className="bento-grid">
          {ethos.map((box, index) => (
            <Reveal
              key={box.title}
              as="article"
              className={`bento${box.wide ? ' bento--wide' : ''}${box.accent ? ` bento--${box.accent}` : ''}`}
              delay={index * 70}
              variant={index === 0 ? 'up' : index % 2 === 0 ? 'left' : 'right'}
            >
              {box.wide && index === 0 ? (
                <div className="bento__head">
                  <img src={avatar} alt="" width={400} height={400} />
                  <h3>{box.title}</h3>
                </div>
              ) : (
                <h3>{box.title}</h3>
              )}

              <p>{box.body}</p>

              {box.list ? (
                <ul>
                  {box.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
