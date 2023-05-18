import { LazyLoadImage } from "react-lazy-load-image-component";

import features from "../../../data/products.json";

const Feature = () => {
  return (
    <main className="py-3 px-8 md:py-8 md:px-20">
      <section>
        <article className="text-center">
          <h2 className="text-headingBlue text-xl md:text-3xl font-semibold">
            {features.header}
          </h2>
          <p className="w-full md:w-[70%] m-5 mx-auto text-lg text-gray-600">
            {features.content}
          </p>
        </article>
        <article className="flex items-center flex-wrap justify-evenly">
          {features?.items?.map((item) => (
            <div
              key={item.key}
              className="w-full px-5 box-border md:w-1/2 mt-4"
            >
              <div className="flex p-3 gap-5  bg-white rounded-md shadow-2xl">
                <LazyLoadImage
                  src={item.icon}
                  className="w-12 h-12"
                  alt="Bannerimage"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-lg">{item?.title}</h4>
                  <p className="text-gray-600">{item?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </article>
        <article className="mt-8 flex items-center justify-center">
          <div className="w-fit px-3 py-2 cursor-pointer rounded-sm bg-buttonBg text-white">
            Get Started Free
          </div>
        </article>
      </section>
    </main>
  );
};

export default Feature;