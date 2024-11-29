import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="about-image"
          className="w-full max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At FOREVER, we believe in redefining fashion by blending timeless
            elegance with modern trends. Our mission is to offer premium-quality
            products that inspire confidence, celebrate individuality, and
            resonate with your unique style.
            <br />
          </p>
          <p>
            Driven by a passion for excellence, we curate collections that
            prioritize quality, sustainability, and affordability. From everyday
            essentials to statement pieces, FOREVER strives to be your go-to
            destination for all your fashion needs
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to empower individuals by providing exceptional
            fashion choices that enhance confidence and self-expression. We aim
            to create a sustainable shopping experience, offering timeless
            designs crafted with care, while ensuring accessibility and
            satisfaction for every customer.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US?" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Ensuring top-notch quality through meticulous craftsmanship,
            sustainable practices, and customer satisfaction.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Seamlessly designed shopping experiences for effortless access to
            your favorite styles anytime.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Dedicated to exceeding expectations with personalized support and
            prompt, reliable assistance.
          </p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
}

export default About;
