
export default function ItemImg({src, className, type}) {

  return <img src={src} alt={`the ${type}'s image`} className={className} />;
}
  