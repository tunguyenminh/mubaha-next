import styles from "@/styles/cart.module.css";
import Link from "next/link";
import dynamic from 'next/dynamic'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import {
   Card, CardBody, CardHeader, CardFooter
} from "reactstrap";
const Products = dynamic(() => import('@/components/cart/Products.js'));
export default function VendorCart({ p, vendorKey, updateProduct, updateQuantity ,
  updateDeleteOneCart,updateSelectProduct,updateSelectVendor,isLoading}) {
  const handleSelectVendor = ()=>{
    updateSelectVendor(vendorKey)
  }
  return (
    <>
    <div style={{borderBottom:'10px solid rgb(245, 245, 250)'}}>
      <Card style={{ border: 'none' }} className="mt-0 mb-4">
        <CardHeader style={{ backgroundColor: 'white' }} className="ml-3">
        {isLoading ? 
        <Skeleton
        width={200}
        height={50}
        rectangle
         />:
          <div className=" mb-2">
            {p.count == p.totalDocs ? "" :
              <input type="checkbox"
                className={`mr-4 mt-5` }
                checked={p.selected}
                role="button"
                onClick={handleSelectVendor}
              />
            }
            <img src="/assets/icon/shop-icon.png" className="mr-2" />
            <Link href={`/vendors/${p.vendor.owner.username}`} passHref>
              <strong className={styles.cursorVendor}>{p.vendor.brandName}</strong>
            </Link>
          </div>
        }
        </CardHeader>
        <CardBody>
        <div>
          <table className="ml-3">
            {p.products.map((item, index) => {
              return (
                <Products item={item} key={index}
                updateDeleteOneCart={updateDeleteOneCart}
                vendor={p} updateSelectProduct={updateSelectProduct}
                  updateProduct={updateProduct} productKey={index} vendorKey={vendorKey}
                  updateQuantity={updateQuantity} isLoading={isLoading} />
              );
            })}
          </table>
          </div>
        </CardBody>
        <CardFooter className="text-muted" style={{ backgroundColor: "white" }}>
          <div className="d-flex mb-2 mt-3">
            <strong>Shop Khuyến Mãi</strong>{" "}
            <span className="ml-2">Vui lòng chọn sản phẩm trước</span>
          </div>
        </CardFooter>
      </Card>
      </div>
    </>
  );
}
