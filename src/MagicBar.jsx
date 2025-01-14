import { useState } from 'react';
import axios from 'axios';
export default function MagicBar({ handleSearch, searchInput }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const autoSuggest = async (value) => {
    const options = {
      method: 'GET',

      url: `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`,
      params: { s: value },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      //setSuggestions(res?.data);
    } catch (error) {
      console.error(error);
    }
  };
  //
  const onChange = (e) => {
    setValue(e.target.value);
    autoSuggest(e.target.value);
  };
  return (
    <div className="  w-full ">
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
          className="px-10 py-[12px] border mx-[34px] my-[70px] rounded-lg w-[1300px] placeholder:text-slate-500 placeholder:text-sm outline-none border-none"
          ref={searchInput}
          onChange={onChange}
          value={value}
        />
      </form>
    </div>
  );
}
