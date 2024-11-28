import { faAward, faHandHoldingHeart, faShirt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Banner from '../components/Banner';
import bannerImage from '../assets/Images/AboutPageBanner.png'

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
     
<Banner bannerImage={bannerImage} heading={'ABOUT'}/>
      {/* Story Section */}
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src="https://images.pexels.com/photos/574177/pexels-photo-574177.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Our Story"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed">
            Founded in 2024, our journey began with a vision to provide premium
            fashion that blends style, comfort, and sustainability. We are
            committed to bringing the best designs crafted with care and
            passion.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-purple-100 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To inspire confidence and elevate personal style through fashion
              that values individuality, quality, and responsibility. We believe
              in empowering communities through ethical practices.
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/5384623/pexels-photo-5384623.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <FontAwesomeIcon icon={faShirt} className="text-purple-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p>Only the finest materials for unmatched comfort and style.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <FontAwesomeIcon icon={faHandHoldingHeart} className="text-pink-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ethical Practices</h3>
            <p>Fashion with a conscience—responsible and sustainable.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <FontAwesomeIcon icon={faAward} className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Award-Winning Designs</h3>
            <p>Recognized globally for innovative and stylish apparel.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Team Member"
                className="rounded-full w-40 h-40 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Team Member"
                className="rounded-full w-40 h-40 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p>Creative Director</p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Team Member"
                className="rounded-full w-40 h-40 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Emily Johnson</h3>
              <p>Marketing Head</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
