import Image from "next/image";
import avatar from "public/assets/avatar.png";
import React, { ReactNode } from "react";


const Avatar: React.FC<AvatarProps> = (props) => {
  const { imageUrl,  size } = props;

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-[55%] border-[#96560914] border-4 object-cover">
        <Image
          unoptimized
          className="rounded-[50%]"
          src={imageUrl || avatar}
          alt="user image"
        />
      </div>
    </div>
  );
};

export default Avatar;

type AvatarProps = {
  children?: ReactNode;
  length: string;
  btnHref?: string;
  imageUrl?: string;
  hotelId: string;
  size: "sm" | "md" | "lg";
};
