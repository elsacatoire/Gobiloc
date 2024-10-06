import Image from "next/image";

const LogoFullName = () => {
	return (
		<Image
			src="/images/gobilocShort.png"
			width={500}
			height={50}
			alt="Gobiloc logo"
			className="min-w-10 max-w-lg"
		/>
	);
};

export default LogoFullName;
