import React from 'react';

import './Resources.css';

import ResourcesCard from './ResourcesCard';

import engineeringinc from './Images/engineering-inc.png';
import startupAggieland from './Images/Startup-Aggieland.jpg';
import agx from './Images/agx.jpeg';

import Resources from './Resources';

function Incubators() {
  return (
      <Resources>
          <div className="cards-container">
              <ResourcesCard
                  url="https://engineeringinc.io/"
                  img={engineeringinc}
                  title="Engineering Inc."
                  description="Do you have an idea that you’d like to transform into a business? Engineering Inc. is here to help. By simulating real-world company structures and providing you with the tools, research and expertise you need, you’ll be better prepared to launch your start-up."
              />

              <br />
              <br />

              <ResourcesCard
                  url="https://mays.tamu.edu/mcferrin-center-for-entrepreneurship/startup-aggieland/"
                  img={startupAggieland}
                  title="Startup Aggieland"
                  description="Startup Aggieland is the place to be for anyone at Texas A&M who wants to learn
                  more about what it means to be an entrepreneur and become familiar with the
                  process of turning innovative ideas into viable business opportunities."
              />

              <br />
              <br />

              <ResourcesCard
                  url="http://iu.adventgx.com/"
                  img={agx}
                  title="Innovation Underground"
                  description="The Innovation Underground encourages entrepreneurship and revitalizes
                  communities. From fundraising support to strategy development, the experts at
                  the Innovation Underground have exactly what you need to get your company on the
                  right track."
              />
          </div>
      </Resources>
  );
}

export default Incubators;
