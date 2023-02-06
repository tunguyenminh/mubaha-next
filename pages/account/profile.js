import Layout from "@/components/profile/Layout.js";
export default function Profile() {
  return(
    <></>
  )
}
Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};