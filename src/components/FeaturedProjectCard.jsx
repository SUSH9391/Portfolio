export default function FeaturedProjectCard({ title, subtitle, image }) {
  return (
    <div className="featuredProjectCard">
      <img src={image} alt={title} />
      <div className="backgroundDim" />
      <div className="featuredCardContent">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}
