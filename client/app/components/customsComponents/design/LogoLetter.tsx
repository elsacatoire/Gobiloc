import Image from "next/image";

const LogoLetter = () => {
	return (
		<Image
			src="/images/logoShortClear.png"
			width={30}
			height={30}
			alt="Logo gobiloc lettre G"
			priority
		/>
	);
};

export default LogoLetter;
