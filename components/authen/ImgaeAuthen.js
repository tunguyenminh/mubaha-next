import Image from 'next/image'
import styles from '@/styles/authen.module.css'
export default function ImageAuthen(){
  return(
    <>
<Image className={styles.imgAuthen} src="/assets/icon/login.jpeg" layout="fill" alt="Login" />
    </>
  )
}