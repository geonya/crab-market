import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
const API_URL = `/api/users/me`;

export default function useUser() {
	const { data, error } = useSWR(API_URL);
	const router = useRouter();
	useEffect(() => {
		if (data && !data.ok) {
			router.replace(`/enter`);
		}
	}, [data, router]);
	return { user: data?.profile, isLoading: !data && !error };
}
