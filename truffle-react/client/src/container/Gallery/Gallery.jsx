import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Gallery.css';
const galleryImages = [
  { image: images.gallery01, name: "Habiba Chouchane \n Product Owner" },
  { image: images.gallery02, name: "Julie Catteau \n Developpeur front-end" },
  { image: images.gallery03, name: "Salma Fathoune \n Developpeur Back-end" },
  { image: images.gallery04, name: "Selima Ben Turkia \n Designer" },
  { image: images.gallery05, name: "Fatou Thiaw \n Rédactrice" }
];
const Gallery = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    
    <div className="app__gallery flex__center" id="gallery">
      <div className="app__gallery-content">
        <SubHeading title="Présentation" />
        <h1 className="headtext__cormorant">Notre equipe</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>Notre groupe est composé de cinq filles passionnées par le développement web et désireuses de mettre leurs compétences en pratique. Nous sommes toutes étudiantes en informatique et nous avons travaillé ensemble sur plusieurs projets au cours de nos études. Nous sommes une équipe dynamique, créative et motivée, et nous avons hâte de relever les défis qui se présentent à nous pour ce projet. Nous avons une grande expérience dans la conception et la réalisation de projets web, ainsi que dans l'utilisation de différentes technologies telles que React, Node.js et MySQL. Nous sommes convaincues que notre collaboration et notre travail acharné nous permettront de livrer un produit de qualité et de répondre aux besoins de nos clients.
</p>
        <button type="button" className="custom__button">View More</button>
      </div>


     <div className="app__gallery-images">
     <div className="app__gallery-images_container" ref={scrollRef}>
    {galleryImages.map((image, index) => (
      <div className="app__gallery-images_card flex__center" key={`gallery_image-${index + 1}`}>
        <img src={image.image} alt="gallery_image" />
        <div className="gallery__image-icon">{image.name}</div>
      </div>
    ))}
  </div>

        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
