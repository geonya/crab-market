import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
const API_URL = `/api/users/me`;
const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser() {
	const { data, error } = useSWR(API_URL, fetcher);
	const router = useRouter();
	useEffect(() => {
		if (data && !data.ok) {
			router.replace(`/enter`);
		}
	}, [data, router]);
	return { user: data?.profile, isLoading: !data && !error };
}
