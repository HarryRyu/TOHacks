import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link
    href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
    rel="stylesheet"
  />
  {/* ... */}
  <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
        <a href="/index" className="mr-5 hover:text-gray-900">
          Home
        </a>
        <a href="/create" className="mr-5 hover:text-gray-900">
          Create a Room
        </a>
      </nav>
      <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="ml-3 text-xl">TOHacks 2022</span>
      </a>
      <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
        <a href="/join">
          <button className="inline-flex items-center bg-yellow-100 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-200 rounded text-base mt-4 md:mt-0">
            Join a Room
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </a>
      </div>
    </div>
  </header>
  <div className="p-5">
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Making at-home exercises
            <br className="hidden lg:inline-block" />
            interesting
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center">
            <a href="/create">
              <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                Create a Room
              </button>
            </a>
            <a href="/join">
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Join a Room
              </button>
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="./conscious-design-pWWdJ4qx0h4-unsplash.jpeg"
          />
        </div>
      </div>
    </section>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-yellow-500 tracking-widest font-medium title-font mb-1">
            ROOF PARTY POLAROID
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Master Cleanse Reliac Heirloom
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom prism
            food truck ugh squid celiac humblebrag.
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Fun
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Challenge your friends for a yoga battle. Compete and be the best!
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Health
            </h2>
            <p className="leading-relaxed text-base mb-4">
              We've got you covered. Playing has its benefits! Be fit and more
              healthy then ever before while having fun.
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Neptune
            </h2>
            <p className="leading-relaxed text-base mb-4">
              The app won't let COVID stop you from having a good time
              exercising at home.
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Social interaction
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Have a virtual interaction with your friends. Play with them and
              get those gains!
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex items-center md:flex-row flex-col">
        <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
          <h2 className="text-xs text-yellow-500 tracking-widest font-medium title-font mb-1">
            ROOF PARTY POLAROID
          </h2>
          <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900">
            Master Cleanse Reliac Heirloom
          </h1>
        </div>
        <div className="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
          <a href="/join">
            <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
              <span className="ml-4 flex items-start flex-col leading-none">
                <span className="text-xs text-gray-600 mb-1">
                  Have fun &amp;
                </span>
                <span className="title-font font-medium">Join a Room</span>
              </span>
            </button>
          </a>
          <a href="/create">
            <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
              <span className="ml-4 flex items-start flex-col leading-none">
                <span className="text-xs text-gray-600 mb-1">
                  Start the fun!
                </span>
                <span className="title-font font-medium">Create A Room</span>
              </span>
            </button>
          </a>
        </div>
      </div>
    </section>
  </div>
</>

    </div>
  )
}


