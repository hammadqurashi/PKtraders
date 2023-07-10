const Hero = (props) => {
  const { text, imageSrc, imageAlt } = props;

  return (
    <div className="container mx-auto">
      <div className="bg-whitea relative mx-auto mb-10 w-full overflow-hidden rounded-t-lg py-32 text-center shadow-lg">
        <h1 className="mt-2 text-5xl font-bold text-white bg-gray-500/50">
          {text}
        </h1>
        <img
          className="-z-10 absolute top-0 left-0 h-full w-full object-cover"
          src={imageSrc}
          alt={imageAlt}
        />
      </div>
    </div>
  );
};

export default Hero;
