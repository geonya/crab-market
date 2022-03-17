import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Button from "@components/button";
import LayOut from "@components/layout";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useUser from "@libs/client/useUser";
import client from "@libs/server/client";

interface ProductWithUser extends Product {
	user: User;
}

interface ItemDetailResponse {
	ok: boolean;
	product: ProductWithUser;
	relatedProducts: Product[];
	isLiked: boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
	product,
	relatedProducts,
}) => {
	const { user } = useUser();
	const router = useRouter();
	const { mutate } = useSWRConfig();
	const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
		`/api/products/${router.query.id}`
	);
	const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
	const onFavClick = () => {
		if (!data) return;
		boundMutate(
			(prev) => prev && { ...prev, isLiked: !prev.isLiked },
			false
		);
		mutate(`/api/users/me`, (prev: any) => ({ ok: !prev?.ok }), false);
		toggleFav({});
	};
	const { handleSubmit } = useForm();
	const [createChatRoom, { loading, data: chatData }] =
		useMutation("/api/chats");
	const onValid = async () => {
		if (loading) return;
		const productId = Number(router.query.id);
		createChatRoom({ productId });
	};
	useEffect(() => {
		if (!chatData?.ok) {
			if (chatData?.currentChat) {
				if (user?.id === chatData?.currentChat.userId)
					router.push(`/chats/${chatData?.currentChat?.id}`);
			}
		}
		if (chatData?.ok) {
			router.push(`/chats/${chatData.chat.id}`);
		}
	}, [user, chatData, router]);
	if (router.isFallback) {
		return (
			<LayOut
				title="Loading for you"
				seoTitle="Loading"
				hasTabBar
				canGoBack
			>
				<h1 className="text-center">I Love you</h1>
			</LayOut>
		);
	}
	return (
		<LayOut hasTabBar canGoBack seoTitle="Product Detail">
			<div className="px-4 py-4">
				<div className="mb-8">
					<div className="relative pb-96">
						<Image
							layout="fill"
							src={`https://imagedelivery.net/MYjqcskotz__nPdJmlB6CQ/${product?.image}/public`}
							className="object-cover"
							alt="product-name"
						/>
					</div>
					<div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
						<Image
							width={48}
							height={48}
							src={`https://imagedelivery.net/MYjqcskotz__nPdJmlB6CQ/${product?.user?.avatar}/avatar`}
							className="w-12 h-12 rounded-full bg-slate-300"
							alt="avatar-image"
						/>
						<div>
							<p className="text-sm font-medium text-gray-700">
								{product?.user?.name}
							</p>
							<Link href={`/users/profile/${product?.user?.id}`}>
								<a className="text-xs font-medium text-gray-500">
									View profile &rarr;
								</a>
							</Link>
						</div>
					</div>
					<div className="mt-5">
						<h1 className="text-3xl font-bold text-gray-900">
							{product?.name}
						</h1>
						<span className="text-3xl mt-3 text-gray-900 block">
							₩ {product?.price}
						</span>
						<p className="text-base my-6 text-gray-700">
							{product?.description}
						</p>
						<div className="flex items-center justify-between space-x-2">
							<form onSubmit={handleSubmit(onValid)}>
								<Button large text="Talk to seller" />
							</form>

							<button
								onClick={onFavClick}
								className={cls(
									"p-3 rounded-md flex items-center justify-center",
									data?.isLiked
										? "text-red-500 hover:text-red-600"
										: "text-gray-400 hover:text-gray-500"
								)}
							>
								{data?.isLiked ? (
									<svg
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
											clipRule="evenodd"
										></path>
									</svg>
								) : (
									<svg
										className="h-6 w-6 "
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Similar items
					</h2>
					<div className="mt-6 grid grid-cols-2 gap-4">
						{relatedProducts?.map((product) => (
							<Link
								href={`/products/${product?.id}`}
								key={product?.id}
							>
								<a>
									<div className="h-56 w-full mb-4 bg-slate-300" />
									<h3 className="text-gray-700 -mb-1">
										{product?.name}
									</h3>
									<span className="text-sm font-medium text-gray-900">
										₩ {product?.price}
									</span>
								</a>
							</Link>
						))}
					</div>
				</div>
			</div>
		</LayOut>
	);
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: true,
	};
};
export const getStaticProps: GetStaticProps = async (ctx) => {
	if (!ctx?.params?.id) {
		return {
			props: {},
		};
	}
	const product = await client.product.findUnique({
		where: {
			id: +ctx.params.id.toString(),
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					avatar: true,
				},
			},
		},
	});
	const terms = product?.name.split(" ").map((word) => ({
		name: {
			contains: word,
		},
	}));
	const relatedProducts = await client.product.findMany({
		where: {
			OR: terms,
			AND: {
				id: {
					not: product?.id,
				},
			},
		},
	});

	return {
		props: {
			product: JSON.parse(JSON.stringify(product)),
			relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
		},
		revalidate: 60,
	};
};

export default ItemDetail;
