import Image from "next/image";
import img1 from "@/assets/header1.avif";
import img2 from "@/assets/header2.avif";

const HomeHero = () => {
  return (
    <>
      {/* <!-- hero - start --> */}
      <div className="pb-6 sm:pb-8 lg:pb-12">
        <section className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-8 flex flex-wrap justify-between md:mb-16">
            <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pt-48 lg:pb-24">
              <h1 className="text-black-800 dark:text-dark-primaryText mb-4 text-4xl font-bold sm:text-5xl md:mb-8 md:text-6xl">
                Trade With
                <br />
                {process.env.NEXT_PUBLIC_SITE_TITLE}
              </h1>

              <p className="max-w-md leading-relaxed text-gray-500 dark:text-dark-secondaryText xl:text-lg">
                Trade around the World with Pakistani Traders.
              </p>
            </div>

            <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
              <div className="relative top-12 left-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:top-16 md:left-16 lg:ml-0">
                <Image
                  src={img1}
                  priority={true}
                  className="h-full w-full object-cover object-center"
                  alt="hero photo"
                />
              </div>

              <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                <Image
                  src={img2}
                  priority={true}
                  className="h-full w-full object-cover object-center"
                  alt="hero photo"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <!-- hero - end --></> */}
    </>
  );
};

export default HomeHero;
