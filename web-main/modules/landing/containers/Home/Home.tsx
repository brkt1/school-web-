'use client';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiDownArrow } from 'react-icons/bi';
import img from '../../../../assets/home/intro.png';
import { AppButton } from '../../components/AppButton/AppButton';
import { Container } from '../../components/Container/Container';
import "./Home.scss";

interface HomeProps {
  initialPosts?: any[];
}

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Generate particle positions only on client side to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{id: number; left: number; delay: number; duration: number}>>([]);
  
  useEffect(() => {
    // Generate particles only on client side after mount
    setParticles(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 10
      }))
    );
  }, []);

  useEffect(() => {
    // Set target date (you can change this to your event date)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days from now

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="home" style={{ backgroundImage: `url(${img.src})` }}>
      {/* Animated background particles */}
      <div className="home__particles">
        {particles.map((particle) => (
          <div key={particle.id} className="particle" style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}></div>
        ))}
      </div>
      
      {/* Gradient orbs */}
      <div className="home__gradient-orb home__gradient-orb--1"></div>
      <div className="home__gradient-orb home__gradient-orb--2"></div>
      <div className="home__gradient-orb home__gradient-orb--3"></div>
      
      {/* Grid pattern overlay */}
      <div className="home__grid-pattern"></div>
      
      <div className="home__overlay"></div>
      <Container className="home__container">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={14} className="home__intro">
            <div className="intro__content">
              <div className="intro__badge">
                <span>Transform Your Future</span>
              </div>
              <h1 className="intro__heading">
                <span className="heading-line">Take the</span>
                <span className="heading-line heading-line--gradient">Stage</span>
              </h1>
              <p className="intro__sub-heading">
                <span className="sub-heading-char">S</span>
                <span className="sub-heading-char">P</span>
                <span className="sub-heading-char">E</span>
                <span className="sub-heading-char">A</span>
                <span className="sub-heading-char">K</span>
                <span className="sub-heading-space"></span>
                <span className="sub-heading-char">L</span>
                <span className="sub-heading-char">I</span>
                <span className="sub-heading-char">K</span>
                <span className="sub-heading-char">E</span>
                <span className="sub-heading-space"></span>
                <span className="sub-heading-char">A</span>
                <span className="sub-heading-space"></span>
                <span className="sub-heading-char">L</span>
                <span className="sub-heading-char">E</span>
                <span className="sub-heading-char">A</span>
                <span className="sub-heading-char">D</span>
                <span className="sub-heading-char">E</span>
                <span className="sub-heading-char">R</span>
              </p>
              <p className="intro__description">
                Transform your communication skills and unlock your leadership potential with our comprehensive training program designed for the future of leadership.
              </p>
              <div className="intro__button-group">
                <Link 
                  href="#registeration" 
                  onClick={(e) => handleScroll(e, '#registeration')}
                  className="intro__button-link"
                >
                  <AppButton className="flex items-center gap-3 group intro__cta-button">
                    <span>Get Started Now</span>
                    <BiDownArrow className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
                  </AppButton>
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={10} className="home__timer-wrapper">
            <div className="timer__container">
              <div className="timer__glow"></div>
              <div className="timer__header">
                <h3 className="timer__title">Registration</h3>
                <p className="timer__subtitle">Ends In</p>
              </div>
              <div className="timer__display">
                <div className="timer__item">
                  <div className="timer__value">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="timer__label">Days</div>
                </div>
                <div className="timer__separator">:</div>
                <div className="timer__item">
                  <div className="timer__value">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="timer__label">Hours</div>
                </div>
                <div className="timer__separator">:</div>
                <div className="timer__item">
                  <div className="timer__value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="timer__label">Minutes</div>
                </div>
                <div className="timer__separator">:</div>
                <div className="timer__item">
                  <div className="timer__value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="timer__label">Seconds</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Floating decorative elements */}
      <div className="home__floating-elements">
        <div className="floating-shape floating-shape--1"></div>
        <div className="floating-shape floating-shape--2"></div>
        <div className="floating-shape floating-shape--3"></div>
      </div>
    </section>
  );
};

export default Home;
