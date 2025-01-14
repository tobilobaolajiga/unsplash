export default function Dropdown({ dropdown, setDropdown, images }) {
  return (
    <div>
      {dropdown && (
        <div className="bg-white h-[200px] relative bottom-[99.7px] left-[30px] w-[1300px] rounded-b-md flex flex-col items-start">
          {images
            .filter((image) => {
              const searchTerm = value;
              const location = image.user.location;
              return searchTerm && location.startsWith(searchTerm);
            })
            .map((image, index) => {
              return (
                <p
                  onClick={() => handleSearch(image.user.location)}
                  key={index}
                >
                  {image.user.location}
                </p>
              );
            })}
        </div>
      )}
    </div>
  );
}
