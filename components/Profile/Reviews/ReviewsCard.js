import { Rate } from "antd";

const ReviewsCard = ({ item }) => {
  return (
    <div
      style={{ boxShadow: "0px 0px 24px 0px #0000001A" }}
      key={item._id}
      className="flex gap-2 flex-col rounded-lg"
    >
      <div className="p-5">
        <div className="flex gap-2">
          <Rate
            className="text-primary"
            disabled
            allowHalf
            defaultValue={item.rating}
          />{" "}
          <span className="text-textGray">{item.rating}</span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] font-medium">
            {item?.freelancerId?.fullName}
          </h1>
          <p className="text-textGray font">
            {item?.createdAt?.split("T")[0]}
          </p>
        </div>
        <p className="text-textGray py-5">{item.review}</p>
        <h2 className="text-textGray font-medium text-[17px]">
          {item?.freelancerId?.location}
        </h2>
      </div>
    </div>
  );
};

export default ReviewsCard;
