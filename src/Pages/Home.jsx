import React from "react";
import { motion } from "framer-motion";
import { Rocket, PenTool, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-br from-indigo-50 to-white">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900"
        >
          Craft Perfect Pitches with{" "}
          <span className="text-indigo-600">AI Magic</span>
        </motion.h2>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Turn your startup ideas into investor-ready pitches in minutes —
          powered by smart AI templates and real-time feedback.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-indigo-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow hover:bg-indigo-700"
        >
          Start Crafting →
        </motion.button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white px-6">
        <h3 className="text-3xl font-bold text-center mb-14 text-gray-900">
          Why Choose <span className="text-indigo-600">PitchCraft?</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <PenTool className="w-10 h-10" />,
              title: "AI Writing Assistance",
              text: "Get instant, data-driven suggestions to make your pitch persuasive and investor-friendly.",
            },
            {
              icon: <Rocket className="w-10 h-10" />,
              title: "Fast & Easy",
              text: "Build your perfect pitch deck in under 10 minutes with a clean, intuitive interface.",
            },
            {
              icon: <Users className="w-10 h-10" />,
              title: "Collaborate Seamlessly",
              text: "Work with your co-founders and mentors in real-time to fine-tune every section.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-10 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md text-center border border-gray-100"
            >
              <div className="flex justify-center mb-5 text-indigo-600">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-xl mb-3 text-gray-900">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-indigo-50 px-6">
        <h3 className="text-3xl font-bold text-center mb-14 text-gray-900">
          Simple, Transparent <span className="text-indigo-600">Pricing</span>
        </h3>

        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-5xl mx-auto">
          {[
            {
              name: "Free",
              price: "$0",
              features: [
                "Basic templates",
                "Limited feedback",
                "Community support",
              ],
            },
            {
              name: "Pro",
              price: "$19/mo",
              features: [
                "All premium templates",
                "Advanced AI feedback",
                "Priority support",
              ],
              highlight: true,
            },
          ].map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-10 rounded-2xl border text-center w-full md:w-80 transition-all ${
                plan.highlight
                  ? "border-indigo-600 bg-white shadow-lg"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <h4 className="text-2xl font-bold mb-3">{plan.name}</h4>
              <p className="text-4xl font-extrabold mb-6">{plan.price}</p>

              <ul className="text-gray-600 mb-6 space-y-2">
                {plan.features.map((feature, j) => (
                  <li key={j}>✔ {feature}</li>
                ))}
              </ul>

              <button
                className={`w-full px-6 py-3 rounded-xl font-semibold ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
