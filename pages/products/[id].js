import Head from 'next/head';
import {useRouter} from 'next/router'
import styles from '../../styles/SingleProduct.module.css';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


const singleproduct = ({product}) => {

	return (
		<>
			<Head>
				<title>{product.name}</title>
			</Head>
			<div className={styles.single_container}>
				<div className={styles.left_section}>
					<img src={product.image.url} className={styles.left_img} alt="" />
				</div>
				<div className={styles.right_section}>
					<h3 className={styles.title}>{product.name}</h3>
					<p className={styles.price}>{product.price}</p>
					<div className={styles.para}>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. At
							impedit voluptatum vitae labore molestiae, maiores, hic ad
							officiis laudantium in officia, nam vel quod! Nesciunt aperiam
							explicabo facere laboriosam eius.
						</p>
					</div>
					<button className="btn">Add to cart 🛒</button>
				</div>
			</div>
		</>
	);
};

export default singleproduct;

export async function getStaticPaths () {
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
	 const paths = allProducts.map(prod => ({
		params: {
			id: prod.id
		}
	}))
	 
	return {
		paths,
		fallback : false
	}
}
export async function getStaticProps ({params}) {
	const client = new ApolloClient({
		uri: 'https://api-eu-central-1.hygraph.com/v2/cl6wowh4y4psh01uqbwfy2l4x/master',
		cache: new InMemoryCache(),
	 })
	 
	 const data = await client.query({
		query: gql`
		query ProductDetail($id:ID!) {
			demoModel(where: {id: $id}) {
			  price
			  name
			  description
			  id
			  image{
				url
			  }
			}
		  }
		`,
		"variables":{"id":`${params.id}`}
	 });
	 
		return {
			props: {
				product: data.data.demoModel
			}
	}
}