import CarouselOptions from "./CarouselOptions";
import SearchBar from "./SearchBar";

export default function SearchOptions() {
  return (
    //this way for side by side like shuffle
    <div className="flex w-full justify-between items-center mt-4">
      <div className="w-1/2">
        <CarouselOptions />
      </div>
      <div className="w-2/5">
        <SearchBar />
      </div>
    </div>
    // this way for like stake
    // <div className="flex flex-col gap-8 w-full">
    //   <SearchBar />
    //   <CarouselOptions />
    // </div>
  );
}
