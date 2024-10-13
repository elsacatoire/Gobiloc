import { fetchFlatshare } from "@/api/services/flatService";
import type { FlatType } from "@/types/flatType";
import { useEffect, useState } from "react";

const FlatshareDetails: React.FC = () => {
	const [flatshare, setFlatshare] = useState<FlatType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getFlatshareData = async () => {
			try {
				const data = await fetchFlatshare();
				setFlatshare(data);
				console.log("data from flatshare fetch", data);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch flatshare data.");
			} finally {
				setLoading(false);
			}
		};
		getFlatshareData();
	}, []);

	return (
		<div>
			<h1>Flatshare Information</h1>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{flatshare && (
				<div>
					<p>Address: {flatshare.name}</p>
					<p>City: {flatshare.description}</p>
					<p>Users: </p>
					{flatshare.users.map((user) => (
						<p key={user.id}>{user.username}</p>
					))}
				</div>
			)}
		</div>
	);
};

export default FlatshareDetails;
