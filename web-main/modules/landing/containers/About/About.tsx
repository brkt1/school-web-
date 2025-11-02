'use client';
import { GlobalOutlined, HeartOutlined, RocketOutlined, TrophyOutlined } from '@ant-design/icons';
import { Container } from '../../components/Container/Container';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import "./About.scss";

export const About = () => {
  const missionPoints = [
    "Students can improve their academic performance.",
    "Job applicants can widen their chances to pass interviews.",
    "Scholarship applicants can improve their success rate in scholarship interviews.",
    "Workers can enhance their prospects for career growth."
  ];

  return (
    <section id="about" className="about">
      <Container>
        <SectionHeading
          heading="About Us"
          subHeading="Empowering voices, transforming futures through exceptional communication skills."
        />
        
        <div className="about__content">
          {/* Introduction Card */}
          <div className="about__intro-card">
            <div className="about__intro-icon">
              <RocketOutlined />
            </div>
            <div className="about__intro-content">
              <p className="about__intro-text">
                Founded on <strong>December 7, 2023</strong>, Take the Stage Trading P.L.C. strives to
                enhance communication skills through guided learning, supporting
                academic, job, and career advancement.
              </p>
            </div>
          </div>

          <div className="about__grid">
            {/* Mission Section */}
            <div className="about__section about__mission">
              <div className="about__section-header">
                <div className="about__section-icon">
                  <TrophyOutlined />
                </div>
                <h3 className="about__section-title">Our Mission</h3>
              </div>
              <p className="about__section-description">
                Facilitating consistent & sufficient stage useful to improve communication skill with teacher's guide so that:
              </p>
              <ul className="about__mission-list">
                {missionPoints.map((point, index) => (
                  <li key={index} className="about__mission-item">
                    <span className="about__mission-bullet"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision & Values Cards */}
            <div className="about__cards">
              <div className="about__card about__vision-card">
                <div className="about__card-icon">
                  <GlobalOutlined />
                </div>
                <h3 className="about__card-title">Our Vision</h3>
                <p className="about__card-text">
                  Being the biggest speaking skill enrichment stage provider company in Africa.
                </p>
                <div className="about__card-accent"></div>
              </div>

              <div className="about__card about__values-card">
                <div className="about__card-icon">
                  <HeartOutlined />
                </div>
                <h3 className="about__card-title">Core Values</h3>
                <p className="about__card-text">
                  Providing human-centered, quality services to everyone at an affordable cost.
                </p>
                <div className="about__card-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
