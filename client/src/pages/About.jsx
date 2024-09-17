const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
          <p className="text-lg text-gray-600 mt-2">
            Discover who we are and what drives us
          </p>
        </header>

        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome to LuxeNest
          </h2>
          <p className="text-gray-700 mb-4">
            At LuxeNest, we are dedicated to providing exceptional real estate
            services tailored to your needs. As a passionate real estate
            professional, I strive to offer a seamless and personalized
            experience whether you are buying, selling, or renting a property.
          </p>
          <p className="text-gray-700 mb-4">
            With extensive knowledge of the local market and a commitment to
            client satisfaction, I work tirelessly to ensure that every
            transaction is handled with the utmost care and professionalism. My
            goal is to exceed your expectations and make your real estate
            journey as smooth and successful as possible.
          </p>
          <p className="text-gray-700">
            Thank you for considering LuxeNest for your real estate needs. I
            look forward to working with you and helping you achieve your real
            estate goals.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Meet the Founder
          </h2>
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <img
              src="/profile.png"
              alt="Your Name"
              className="w-48 h-48 object-cover rounded-full mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Shivansh Gupta
              </h3>
              <p className="text-gray-700 mb-4">
                Founder & Real Estate Specialist
              </p>
              <p className="text-gray-700 mb-4">
                With a deep understanding of the real estate market and a
                passion for helping clients, I have dedicated my career to
                making the home buying and selling process as straightforward
                and enjoyable as possible. My hands-on approach ensures that you
                receive personalized service and expert advice throughout your
                real estate journey.
              </p>
              <p className="text-gray-700">
                Feel free to reach out to me directly with any questions or to
                schedule a consultation. I am here to assist you every step of
                the way.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
