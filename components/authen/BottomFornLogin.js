import Link from "next/link";
export default function BottomFornLogin({slug}) {
  return (
    <>
      <div className="mt-4 d-flex justify-content-center ml-3 mr-3 mb-5">
        <div>
        {slug ===undefined ? 
          <Link href="/auth/register">
            <a className="text-primary">Tạo một tài khoản mới</a>
          </Link>
          :
          <Link href={`/auth/register?slug=${slug}`}>
            <a className="text-primary">Tạo một tài khoản mới</a>
          </Link>
        }
        </div>
      </div>
    </>
  )
}