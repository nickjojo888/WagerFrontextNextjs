import CarouselOptions from "./CarouselOptions";
import SearchBar from "./SearchBar";

export default function SearchOptions() {
  return (
    // this way for side by side like shuffle
    // <div className="flex w-full justify-between items-center px-8 mt-4">
    //   <div className="w-1/2">
    //     <CarouselOptions />
    //   </div>
    //   <div className="w-2/5">
    //     <SearchBar />
    //   </div>
    // </div>
    <div className="flex flex-col gap-8 w-full">
      <SearchBar />
      <CarouselOptions />
    </div>
  );
}
