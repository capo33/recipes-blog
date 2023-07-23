 import food from "../../assets/images/hero-image.png";

const Hero = () => {
  return (
    <div className='row flex-lg-row-reverse align-items-center py-4 mb-4'>
    <div className='col-12 col-lg-6'>
      <img
        src={food}
        width={607}
        height={510}
        className='d-block mx-lg-auto img-fluid'
        loading='lazy'
        alt='Cooking With Node.js'
      />
    </div>
    <div className='col-12 col-lg-6'>
      <h1 className='display-5 fw-bold mb-3'>
        Huge selection of delicios recipe ideas
      </h1>
      <p className='lead'>
        Explore our huge selection of delicious recipe ideas including;
        easy desserts, delicious vegan and vegetarian dinner ideas,
        gorgeous pasta recipes, quick bakes, family-friendly meals and
        gluten-free recipes.
      </p>
      <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
        <a
          href='/explore-latest'
          className='btn btn-primary btn-dark btn-lg px-4 me-md-2'
        >
          Explore Latest
        </a>
        <a
          href='/explore-random'
          className='btn btn-outline-secondary btn-lg px-4 me-md-2'
        >
          Show Random
        </a>
      </div>
    </div>
  </div>
  )
}

export default Hero