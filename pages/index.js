
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

export default function Home({products}) {
	return (
		<>
			<Head>
				<title>Plants | Home</title>
			</Head>
			<div className="container">
				<h2 className={styles.title}>
					All Products <span>🌿</span>
				</h2>
				<div className={styles.products_container}>
					{products.map((product) => {
						return (
							<div className={styles.product_card} key={product.id}>
								<Link href={`products/${product.id}`}>
									<a>
										<div className={styles.product_img}>
											<img src={product.image.url} alt={product.name} style={{maxWidth:300, maxHeight:400}} />
										</div>
									</a>
								</Link>
								<div className={styles.product_content}>
									<h3>{product.name}</h3>
									<p>${product.price}</p>
									<button className="btn">Add to cart 🛒</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export async function getStaticProps () {
	const client = new ApolloClient({
		uri: 'https://api-eu-central-1.hygraph.com/v2/cl6wowh4y4psh01uqbwfy2l4x/master',
		cache: new InMemoryCache(),
	 })
	 const data = await client.query({
		query: gql`
		query MyQuery {
			demoModels {
			  description
			  id
			  price
			  name
			  image {
				url
			  }
			}
		  }
		`,
	 });
	 const allProducts = data.data.demoModels;
	return {
		props: {
			products:allProducts
		}
	}
}