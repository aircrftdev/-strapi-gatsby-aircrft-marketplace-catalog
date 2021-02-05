import React from "react"
import Layout from "../../components/layout"
import { graphql } from "gatsby"
import SharpImage from "../../components/sharp-image"
import ReactMarkdown from "react-markdown"
import ProductList from "../../components/product-list"
import SEO from "../../components/seo"
import { formatPrice } from '../../helpers/currency-formatter'

const ProductPage = ({ data }) => {
  const product = data.strapiProduct
  const relatedProducts =
    product.relatedProducts && product.relatedProducts.products

  const seo = { title: product.title, image: product.image.publicURL }

  const flexJustify = product.specifications.length > 0 ? 'between' : 'center'

  return (
    <Layout>
      <SEO seo={seo} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {product.image && (
          <div className="md:col-span-2">
            <SharpImage className="rounded-md" image={product.image} />
          </div>
        )}
        <div className={`flex flex-col justify-${flexJustify}`}>
          <div>
            <h1 className="text-4xl">{product.title}</h1>

            {product.price && (
              <div className="text-sm flex justify-between">
                <p className="font-extralight">
                  Price
                </p>
                <p>{formatPrice(product.price)}</p>
              </div>
            )}
          </div>
          <div className="w-full">
            {product.specifications &&
              product.specifications.map((spec, index) => (
                <div
                  className="w-full flex text-sm justify-between items-between border-b mb-2 pb-1"
                  key={`${spec.key}-${index}`}
                >
                  <span className="font-extralight">{spec.key}</span>
                  <span>{spec.value}</span>
                </div>
              ))}
          </div>
          <a href={product.dealerUrl} target="_blank" rel="noreferrer" className="p-4 text-center font-medium rounded-md border-2 mt-4">
            See Dealer Website
          </a>
        </div>
      </div>
      <div className="my-6 mb-24">
        <h1 className="text-4xl font-bold text-center">Product Description</h1>
        <hr className="mt-6 mb-12 m-auto w-24 border-t-4" />
        <ReactMarkdown
          className="prose md:w-4/5 m-auto"
          children={product.productDescription}
        />
      </div>
      {relatedProducts && (
        <div className="flex flex-col my-6 mb-24">
          <h1 className="text-4xl font-bold text-center">Related Products</h1>
          <hr className="mt-6 mb-12 m-auto w-24 border-t-4" />
          <ProductList
            products={relatedProducts}
            gridCols="grid-cols-1 md:grid-cols-2"
          />
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query ProductQuery($slug: String!) {
    strapiProduct(slug: { eq: $slug }) {
      title
      productDescription
      id
      price
      dealerUrl
      image {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1024, maxHeight: 768) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      specifications {
        key
        value
      }
      relatedProducts {
        products {
          title
          price
          id
          slug
          image {
            childImageSharp {
              fluid(maxWidth: 1024, maxHeight: 768) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default ProductPage
