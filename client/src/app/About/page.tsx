import React from 'react';
import AboutComponent from '@/components/guest/AboutComponent';
import WhyChoose from '@/components/guest/WhyChoose';

const page = () => {
  return (
    <div className='md:px-0 px-3'>
      <AboutComponent />
      <WhyChoose />
    </div>
  );
};

export default page;