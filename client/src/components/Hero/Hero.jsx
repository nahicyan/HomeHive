import React from "react";
const Hero = () => {
  return (
        <div className="bg-[#FDF8F2]">
          <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
                {/* Left Content */}
                <div>
                  <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold leading-tight text-[#4b5b4d] sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl">
                      The Best Land Deals In Texas
                    </h1>
                    <p className="mt-4 text-lg text-gray-700 sm:mt-8">
                      Discover unbeatable land deals across Texas with prime locations and great prices. Secure your perfect property today before it's gone!
                    </p>
    
                    {/* Search Input */}
                    <form action="#" method="POST" className="mt-8 sm:mt-10">
                      <div className="relative p-2 sm:border sm:border-gray-400 group sm:rounded-xl sm:focus-within:ring-1 sm:focus-within:ring-gray-900 sm:focus-within:border-gray-900">
                        <input
                          type="text"
                          placeholder="Search by city, county, or zip code"
                          className="block w-full px-4 py-4 text-gray-900 placeholder-gray-700 bg-transparent border border-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 rounded-xl sm:border-none sm:focus:ring-0 sm:focus:border-transparent"
                          required
                        />
                        <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-2">
                          <button
                            type="submit"
                            className="inline-flex px-6 py-3 text-lg font-bold text-white bg-[#576756] rounded-lg transition hover:bg-[#4b5b4d]"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
    
                  {/* Stats */}
                  <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
                    <div className="flex items-center">
                      <p className="text-3xl font-medium text-[#4b5b4d] sm:text-4xl">100+</p>
                      <p className="ml-3 text-sm text-[#4b5b4d]">Prime <br />Listings</p>
                    </div>
    
                    <div className="hidden sm:block">
                      <svg className="text-gray-400" width="16" height="39" viewBox="0 0 16 39" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
                        <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
                        <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
                        <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
                        <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
                      </svg>
                    </div>
    
                    <div className="flex items-center">
                      <p className="text-3xl font-medium text-[#4b5b4d] sm:text-4xl">$10M+</p>
                      <p className="ml-3 text-sm text-[#4b5b4d]">Lands <br />Sold</p>
                    </div>
                  </div>
                </div>
    
                {/* Right Image */}
                <div>
                  <img className="w-full rounded-xl shadow-lg" src="./banner.jpg" alt="Texas Land" />
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    };
    
export default Hero;