import { assets } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo-img" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Welcome to FOREVER, your one-stop destination for the latest fashion
            trends and timeless styles. Discover exclusive collections designed
            to make you stand out. Shop now and elevate your wardrobe with our
            best-sellers and new arrivals. Your satisfaction is our
            priority—because you deserve the best.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+49 244 1139</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          ©️ {currentYear} @forever.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
