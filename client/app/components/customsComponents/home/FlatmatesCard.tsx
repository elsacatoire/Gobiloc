import Avatar from "@/app/profile/components/Avatar";
import { Sun } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";

type FlatmatesCardProps = {
	flatmates: string[];
};

const FlatmatesCard = ({ flatmates }: FlatmatesCardProps) => {
	return (
		<Card className="w-full">
			<CardHeader className="font-bold">Les colocs</CardHeader>
			<CardContent className="px-0">
				{flatmates.length > 0 ? (
					<ul className="flex flex-col">
						{flatmates.map((mate) => (
							<li key={mate}>
								<Button variant={"link"} className="flex gap-3">
									<Avatar
										src="/images/avatar5.jpg"
										alt={`${mate}'s avatar`}
										style="w-8"
									/>
									<p className="">{mate}</p>
									<Sun className="min-w-10" />
								</Button>
							</li>
						))}
					</ul>
				) : (
					<p>Aucun colocataire trouvé.</p>
				)}
			</CardContent>
		</Card>
	);
};

export default FlatmatesCard;
