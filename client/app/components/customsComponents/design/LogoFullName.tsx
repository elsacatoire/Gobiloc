import Image from "next/image";
import React from "react";

const LogoFullName = () => {
	return (
		<Image
			src="/images/gobilocShort.png"
			height={50}
			width={500}
			alt="Gobiloc logo"
			className="min-w-10 max-w-lg"
		/>
	);
};

export default LogoFullName;
