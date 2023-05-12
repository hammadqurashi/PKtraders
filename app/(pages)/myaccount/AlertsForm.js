import React from "react";

const AlertsForm = () => {
  return (
    <form className="container mx-auto mt-10 rounded bg-gray-100 dark:bg-dark-primaryBackground w-11/12 xl:w-full">
      <div className="xl:w-full py-5 px-8">
        <div className="flex items-center mx-auto">
          <div className="container mx-auto">
            <div className="mx-auto xl:w-full">
              <p className="text-lg text-gray-800 dark:text-dark-primaryText font-bold">
                Alerts
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-secondaryText pt-1">
                Get updates of any new activity or features. Turn on/off your
                preferences
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-6">
        <div className="flex items-center pb-4 border-b border-gray-300 dark:border-gray-700 px-8 text-gray-800 dark:text-dark-primaryText">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-mail"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <rect x={3} y={5} width={18} height={14} rx={2} />
            <polyline points="3 7 12 13 21 7" />
          </svg>
          <p className="text-sm font-bold ml-2 text-gray-800 dark:text-dark-primaryText">
            Via Email
          </p>
        </div>
        <div className="px-8">
          <div className="flex justify-between items-center mb-8 mt-4">
            <div className="w-9/12">
              <p className="text-sm text-gray-800 dark:text-dark-primaryText pb-1">
                Comments
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-secondaryText">
                Get notified when a post or comment is made
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-12 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-gray-300 after:content-[''] after:absolute after:-top-[2px] after:left-0  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#ed1c24]"></div>
            </label>
          </div>
          <div className="flex justify-between items-center mb-8">
            <div className="w-9/12">
              <p className="text-sm text-gray-800 dark:text-dark-primaryText pb-1">
                Job Applications
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-secondaryText">
                Get notified when a candidate applies to a job posting
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-12 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-gray-300 after:content-[''] after:absolute after:-top-[2px] after:left-0  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#ed1c24]"></div>
            </label>
          </div>
          <div className="flex justify-between items-center mb-8">
            <div className="w-9/12">
              <p className="text-sm text-gray-800 dark:text-dark-primaryText pb-1">
                Product Updates
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-secondaryText">
                Get notifitied when there is a new product feature or upgrades
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-12 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-gray-300 after:content-[''] after:absolute after:-top-[2px] after:left-0  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#ed1c24]"></div>
            </label>
          </div>
        </div>
        <div className="pb-4 border-b border-gray-300 dark:border-gray-700 px-8">
          <div className="flex items-center text-gray-800 dark:text-dark-primaryText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-bell"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
            <p className="text-sm font-bold ml-2 text-gray-800 dark:text-dark-primaryText">
              Push Notifications
            </p>
          </div>
        </div>
        <div className="px-8">
          <div className="flex justify-between items-center mb-8 mt-4">
            <div className="w-9/12">
              <p className="text-sm text-gray-800 dark:text-dark-primaryText pb-1">
                Comments
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-secondaryText">
                Get notified when a post or comment is made
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-12 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-gray-300 after:content-[''] after:absolute after:-top-[2px] after:left-0  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#ed1c24]"></div>
            </label>
          </div>
          <div className="flex justify-between items-center mb-8">
            <div className="w-9/12">
              <p className="text-sm text-gray-800 dark:text-dark-primaryText pb-1">
                Job Applications
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-secondaryText">
                Get notified when a candidate applies to a job posting
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-12 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-gray-300 after:content-[''] after:absolute after:-top-[2px] after:left-0  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#ed1c24]"></div>
            </label>
          </div>
          <div className="flex justify-between items-center mb-8">
            <div className="w-9/12">
              <p className="text-sm text-gray-800 dark:text-dark-primaryText pb-1">
                Product Updates
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-secondaryText">
                Get notifitied when there is a new product feature or upgrades
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-12 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-gray-300 after:content-[''] after:absolute after:-top-[2px] after:left-0  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#ed1c24]"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="container mx-auto w-11/12 xl:w-full">
        <div className="w-full py-4 sm:px-0 bg-white dark:bg-dark-primaryBackground flex justify-end">
          <button
            className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-[#ed1c24] dark:text-[#ed1c24] px-6 py-2 text-xs mr-4"
            type="reset"
          >
            Cancel
          </button>
          <button
            className="bg-[#ed1c24] focus:outline-none transition duration-150 ease-in-out rounded text-white px-8 py-2 text-sm"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AlertsForm;
