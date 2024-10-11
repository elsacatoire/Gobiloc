"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { getCategoryName } from "@/app/enums/ChecklistCategoryEnum";
import type { ChecklistType } from "@/types/ChecklistType";
import { formatDate } from "@/utils/formatDate";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import type React from "react";

type ChecklistCardProps = {
	list: ChecklistType;
	onDelete: (id: number) => void;
};

const ChecklistCard: React.FC<ChecklistCardProps> = ({ list, onDelete }) => {
	return (
		<Card>
			<div className="flex p-3 bg-teal-50">
				<Link href={`/list/${list.id}`}>
					<div className="w-60">
						<p className="font-light text-xs">{formatDate(list.updateDate)}</p>
						<p className="font-semibold">{list.name}</p>
						<p>{getCategoryName(list.category) || ""}</p>
					</div>
				</Link>
				<div className="flex pt-2">
					<Button
						variant="destructive"
						size="icon"
						onClick={() => onDelete(list.id)}
					>
						<Trash2
							strokeWidth={1}
							color="white"
							className="h-5 w-5 justify-center"
						/>
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default ChecklistCard;
