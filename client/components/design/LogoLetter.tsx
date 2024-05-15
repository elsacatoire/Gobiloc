import Image from 'next/image';

const LogoLetter = () => {
    return (
        <Image
            src="/images/logoShort.png"
            width={30}
            height={30}
            alt="Logo gobiloc lettre G"
        />
    );
};

export default LogoLetter;
