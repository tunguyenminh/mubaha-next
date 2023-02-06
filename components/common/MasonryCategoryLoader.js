import ContentLoader from "react-content-loader";

export default function MasonryCategoryLoader(props) {
    
  return (
    <ContentLoader
      speed={2}
      width={340}
      height={84}
      viewBox="0 0 340 84"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
      <rect x="76" y="-3" rx="3" ry="3" width="63" height="14" />
      <rect x="78" y="19" rx="3" ry="3" width="50" height="9" />
      <rect x="157" y="-1" rx="3" ry="3" width="72" height="11" />
      <rect x="156" y="15" rx="3" ry="3" width="100" height="11" />
      <rect x="2" y="33" rx="3" ry="3" width="37" height="11" />
      <rect x="1" y="20" rx="3" ry="3" width="67" height="9" />
      <rect x="78" y="34" rx="3" ry="3" width="67" height="11" />
      <rect x="79" y="68" rx="3" ry="3" width="37" height="11" />
      <rect x="78" y="52" rx="3" ry="3" width="67" height="9" />
      <rect x="2" y="51" rx="3" ry="3" width="67" height="9" />
      <rect x="3" y="64" rx="3" ry="3" width="37" height="11" />
      <rect x="157" y="31" rx="3" ry="3" width="100" height="11" />
      <rect x="158" y="50" rx="3" ry="3" width="70" height="9" />
    </ContentLoader>
  );
}
