import React from 'react';

import "./About.scss"

export const About = () => {
  const description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolores ea fugiat nesciunt quisquam.'

  return (
    // <section id="about" className="about">
    //   <Container>
    //     <Row gutter={[24, 24]} justify="center">
    //       <Col xs={24} sm={20} md={12} lg={8}>
    //         <AboutCard
    //           icon={<SettingOutlined />}
    //           title={"React Component"}
    //           description={description}
    //         />
    //       </Col>
    //       <Col xs={24} sm={20} md={12} lg={8}>
    //         <AboutCard
    //           icon={<EyeOutlined />}
    //           title={"Ant Design"}
    //           description={description}
    //         />
    //       </Col>
    //       <Col xs={24} sm={20} md={12} lg={8}>
    //         <AboutCard
    //           icon={<HeartOutlined />}
    //           title={"Crafted with Love"}
    //           description={description}
    //         />
    //       </Col>
    //     </Row>
    //   </Container>
    // </section>
    <section id="about" className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            About <span className="text-blue-600">Us</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-left">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded on December 7, 2023, Take the Stage Trading P.L.C. strives to
                enhance communication skills through guided learning, supporting
                academic, job, and career advancement.
              </p>
              <div className="space-y-4">
  <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
  <p className="text-gray-600">
    Facilitating consistent & sufficient stage useful to improve communication skill with teacher's guide so that:
  </p>
  <ul className="space-y-2 text-gray-600">
    <li className="flex items-center">
      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
      Students can improve their academic performance.
    </li>
    <li className="flex items-center">
      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
      Job applicants can widen their chances to pass interviews.
    </li>
    <li className="flex items-center">
      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
      Scholarship applicants can improve their success rate in scholarship interviews.
    </li>
    <li className="flex items-center">
      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
      Workers can enhance their prospects for career growth.
    </li>
  </ul>
</div>

            </div>
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  Being the biggest speaking skill enrichment stage provider company in
                  Africa.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Core Values</h3>
                <p className="text-gray-600">
                  Providing human-centered, quality services to everyone at an
                  affordable cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
