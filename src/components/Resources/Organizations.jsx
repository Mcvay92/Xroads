import React from 'react';

import './Resources.css';

import ResourcesCard from './ResourcesCard';

import ceo from './Images/CEO.jpg';
import tacg from './Images/tacg.webp';
import aic from './Images/aic.png';
import aib from './Images/aib.png';

import Resources from './Resources';

function Organizations() {
  return (
      <Resources>
          <div className="cards-container">
              <ResourcesCard
                  url="https://www.facebook.com/TAMUCEO/"
                  img={ceo}
                  title="CEO"
                  description="The Collegiate Entrepreneurs Organization - Texas A&M University chapter is one
              of more than 250 C-E-O chapters globally. CEO is the front door to
              entrepreneurship at Texas A&M University."
              />

              <br />
              <br />

              <ResourcesCard
                  url="https://www.tamuconsultinggroup.com/"
                  img={tacg}
                  title="Texas A&M Consulting Group"
                  description="Texas A&M Consulting Group is a student-organized group that offers a wide range
                  of consulting services with the necessary tools and expertise to help grow your
                  organization. We partner with our clients from start to finish, focusing on
                  their needs while producing new ideas, developing effective strategies and
                  designing high quality and scalable solutions."
              />

              <br />
              <br />

              <ResourcesCard
                  url="http://www.tamuaic.org/"
                  img={aic}
                  title="The Aggie Investment Club"
                  description="The Aggie Investment Club seeks to provide Texas A&M students with unparalleled opportunities and advantages within the realm of finance and investing."
              />

              <br />
              <br />

              <ResourcesCard
                  url="http://txaib.org/"
                  img={aib}
                  title="Texas Aggies in Business"
                  description="AiB offers businesses the chance to receive fresh ideas and high quality deliverables at a price that won’t break the bank. AiB Consulting offers consulting projects for paying clients seeking assistance. Access to new perspectives, consultants with diverse backgrounds, and the resources of Texas A&M University are three examples of the value created by hiring AiB Consulting."
              />

              <br />
              <br />
          </div>
      </Resources>
  );
}

export default Organizations;
