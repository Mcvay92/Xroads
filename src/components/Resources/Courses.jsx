import React from 'react';

import './Resources.css';

import ResourcesCard from './ResourcesCard';

import tamuengineering from './Images/tamuengineering.jpg';
import tamumays from './Images/tamumays.png';

import Resources from './Resources';

function Courses() {
  return (
      <Resources>
          <div className="cards-container">
              <ResourcesCard
                  url="https://engineering.tamu.edu/student-life/eep/programs/courses.html"
                  img={tamuengineering}
                  title="Engineering Entrepreneurship Courses"
                  description="Engineering Entrepreneurship equips you with the skills, knowledge and experiences needed to be successful in industry. Whether you’re interested in launching your own startup, commercializing your product or leading design and innovation at a Fortune 500 company, we will help you develop the entrepreneurial mindset necessary for your success."
              />

              <br />
              <br />

              <ResourcesCard
                  url="https://mays.tamu.edu/mcferrin-center-for-entrepreneurship/graduate-certificate-in-entrepreneurship/"
                  img={tamumays}
                  title="Graduate Certificate In Entrepreneurship"
                  description="A Graduate Certificate in Entrepreneurship and technology commercialization provides a base understanding of new business planning, key issues encountered when developing commercial applications for new technical discoveries, fundamental business start-up and securities laws and the management of creativity and innovation in organizational settings."
              />

              <br />
              <br />
          </div>
      </Resources>
  );
}

export default Courses;
