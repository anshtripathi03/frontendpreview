import { FaStar, FaRocket, FaThumbsUp, FaPaintBrush, FaHeadset, FaWrench } from "react-icons/fa";

const reasons = [
  { icon: <FaPaintBrush size={24} />, title: "Premium Designs", desc: "Elegant & culturally rich cards crafted by top designers." },
  { icon: <FaWrench size={24} />, title: "Full Customization", desc: "Personalize everything from text to texture." },
  { icon: <FaThumbsUp size={24} />, title: "Affordable Pricing", desc: "Premium quality at competitive pricing." },
  { icon: <FaRocket size={24} />, title: "Fast Delivery", desc: "Swift and safe delivery with express options." },
  { icon: <FaStar size={24} />, title: "Trusted Brand", desc: "Thousands of happy customers across India." },
  { icon: <FaHeadset size={24} />, title: "24/7 Support", desc: "We're always here to help, pre or post-purchase." },
];

export default function WhyChooseUs() {
  return (
    <section className="pt-10 bg-[#f4f0d4]" id="why-choose-us">
      <div className="pb-8 max-w-6xl mx-auto px-2">
        <h2 className="text-4xl font-bold text-[#5b2c06] mb-8 text-center">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-blue-900 text-white border border-[#e7d3b5] p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className=" mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2">
                {reason.title}
              </h3>
              <p>{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
