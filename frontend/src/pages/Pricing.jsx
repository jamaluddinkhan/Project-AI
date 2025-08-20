import React from 'react';
import Header from '../components/common/Header';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      credits: "5",
      features: [
        "5 video generations",
        "720p resolution",
        "Basic video styles",
        "Community support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      credits: "50",
      features: [
        "50 video generations",
        "1080p resolution",
        "All video styles",
        "Priority generation",
        "Commercial license",
        "Email support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29.99",
      credits: "200",
      features: [
        "200 video generations",
        "4K resolution",
        "All video styles",
        "Highest priority",
        "Commercial license",
        "24/7 dedicated support",
        "Custom styles available"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for your creative needs. All plans include our powerful AI video generation technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm p-8 relative ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.price !== "Free" && <span className="text-gray-600">/month</span>}
              </div>
              
              <div className="mb-6">
                <span className="text-lg font-semibold text-gray-900">{plan.credits} credits</span>
                <span className="text-gray-600"> included</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.price === "Free" ? 'Get Started' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What are credits?</h3>
              <p className="text-gray-600">
                Credits are used to generate videos. Each video generation consumes one credit, regardless of video length or complexity.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll keep access to your current plan until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do unused credits roll over?</h3>
              <p className="text-gray-600">
                Unused credits do not roll over to the next month. We recommend using all your credits before your billing cycle renews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;