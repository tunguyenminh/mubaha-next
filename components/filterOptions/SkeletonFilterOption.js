import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function SkeletonFilterOption() {
  return (
    <>
      <Skeleton height={30} />
      <Skeleton width={"50%"} count={2} />
      <Skeleton width={"25%"} count={2} />
      <br></br>
      <Skeleton height={30} />
      <Skeleton width={"50%"} count={2} />
      <Skeleton width={"25%"} count={2} />
      <br></br>
      <Skeleton height={30} />
      <Skeleton width={"50%"} count={2} />
      <Skeleton width={"25%"} count={2} />
      <br></br>
      <Skeleton height={30} />
      <Skeleton width={"50%"} count={2} />
      <Skeleton width={"25%"} count={2} />
      <br></br>
      <Skeleton height={30} />
      <Skeleton width={"50%"} count={2} />
      <Skeleton width={"25%"} count={2} />
    </>
  )
}