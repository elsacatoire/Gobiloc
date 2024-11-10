import ContactLink from "@/app/components/customsComponents/links/ContactLink";
import UseGobilocLink from "@/app/components/customsComponents/links/UseGobilocLink";

const contact = () => {
	return (
		<div className="flex flex-col gap-8 md:max-w-2xl md:m-auto">
			<ContactLink />
			<UseGobilocLink />
		</div>
	);
};

export default contact;
