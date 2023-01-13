import Image, { StaticImageData } from "next/image";
import React from "react";

interface FeatureCardProps {
  imageSrc: StaticImageData;
  imageAlt: string;
  title: string;
  description: string;
}

export const FeatureCard = (props: FeatureCardProps) => {
  return (
    <div className="md:w-1/3 bg-pink-200 p-6 text-white rounded-md relative">
      <div className="flex justify-center mb-4 absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2">
        <Image
          className="border-2 border-white rounded-full p-2 bg-blue-200"
          src={props.imageSrc}
          alt={props.imageAlt}
          width={120}
          height={120}
        />
      </div>

      <div className="mt-12">
        <h3 className="font-bold text-xl sm:text-2xl mb-4">{props.title}</h3>
        <p className="text-justify text-lg">{props.description}</p>
      </div>
    </div>
  );
};
