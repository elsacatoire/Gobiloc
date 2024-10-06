import Image from "next/image";
import type React from "react";

interface AvatarProps {
	src: string;
	style?: string;
	alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, style = "w-10 h-10" }) => {
	return (
		<div className={`overflow-hidden rounded-full ${style}`}>
			<Image
				src={src}
				alt={alt}
				width={50}
				height={50}
				className="object-cover w-full h-full"
			/>
		</div>
	);
};

export default Avatar;
