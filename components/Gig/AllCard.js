import GigCard from "../common/GigCard";
import AllCardTopFilters from "./AllCardTopFilters";

const AllCard = ({ data}) => {
  return (
    <div>
      {/* sort by filter and total */}
      <AllCardTopFilters data={data} />
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2  xl:grid-cols-3 xxl:grid-cols-4 gap-5">
        {/* gig card */}
        {data?.map((item, index) => {
          return <GigCard key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default AllCard;
