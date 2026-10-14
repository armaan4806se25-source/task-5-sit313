function Section({
  title,
  subtitle,
  items,
  CardComponent,
  buttonText
}) {
  return (
    <section className="content-section">

      <div className="section-heading">
        <span className="section-label">
          FEATURED
        </span>

        <h2>{title}</h2>

        <p>{subtitle}</p>
      </div>

      {/* THIS IS WHERE YOU ADD map() */}
      <div className="card-grid">

        {items.map((item) => (
          <CardComponent
            key={item.id}
            item={item}
          />
        ))}

      </div>

      <div className="section-button">
        <button className="outline-button">
          {buttonText}
        </button>
      </div>

    </section>
  );
}

export default Section;