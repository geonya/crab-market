import LayOut from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface IPost {
	title: string;
	date: string;
	category: string;
	slug: string;
}
const Blog: NextPage<{ posts: IPost[] }> = ({ posts }) => {
	return (
		<LayOut title="Blog" seoTitle="Blog">
			<h1 className="font-semibold text-center text-lg my-10">
				Latest Posts
			</h1>
			<ul>
				{posts.map((post, index) => (
					<div key={index} className="mb-5">
						<Link href={`/blog/${post.slug}`}>
							<a>
								<span className="text-lg text-red-500">
									{post.title}
								</span>
								<div>
									<span>{post.category}</span>
									<span>{post.date}</span>
								</div>
							</a>
						</Link>
					</div>
				))}
			</ul>
		</LayOut>
	);
};

export async function getStaticProps() {
	const blogPosts = readdirSync("./posts").map((file) => {
		const content = readFileSync(`./posts/${file}`, "utf-8");
		const [slug, _] = file.split(".");
		return { ...matter(content).data, slug: file };
	});
	return {
		props: {
			posts: blogPosts,
		},
	};
}
export default Blog;
