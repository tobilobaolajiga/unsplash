import { useEffect, useRef, useState } from 'react';
import Modal from '../Modal';
import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 12;

export default function SearchBar() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value || 'Nigeria'
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=JN9xKlscrc6cnYxRMM9KXg6y-iURu3w31LiLoXwmzkc`
      );
      const results = data.results;

      setImages(results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
  };

  const [modal, setModal] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const getImg = (id, imgSrc, imgName, imgLocation) => {
    console.log(id, imgSrc, imgName, imgLocation);
    setTempImgSrc(imgSrc);
    setName(imgName);
    setLocation(imgLocation);
    setModal(!modal);
  };
  const closeModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div>
        <div className="bg-slate-200  w-full ">
          <img
            src="./searchIcon.svg"
            width="20"
            height="20"
            className="absolute top-[115px] left-12"
          />
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search for photo"
              className="px-10 py-[12px] border mx-[34px] my-[100px] rounded-lg w-[1300px] placeholder:text-slate-500 placeholder:text-sm outline-none border-none"
              ref={searchInput}
            />
          </form>
        </div>
        <div className="relative bottom-[130px] z-50">
          <div className="grid grid-cols-3 mx-12 mt-8  p-0">
            {images.map((image, index) => {
              return (
                <div
                  key={index}
                  className="m-4 mb-12 cursor-pointer"
                  onClick={() =>
                    getImg(
                      image.id,
                      image.urls.regular,
                      image.user.name,
                      image.user.location,
                      modal
                    )
                  }
                >
                  <img
                    src={image.urls.small}
                    className="rounded-md relative top-12 -z-30 h-80 object-cover w-full"
                  />
                  <div className="ml-2 mb-2">
                    <p className="text-white font-bold text-sm">
                      {image.user.name}
                    </p>
                    <p className="text-white text-xs">{image.user.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          imgSrc={tempImgSrc}
          imgName={name}
          imgLocation={location}
          getImg={closeModal}
        />
      )}
    </div>
  );
}
