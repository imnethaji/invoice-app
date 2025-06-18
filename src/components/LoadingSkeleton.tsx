import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-4 items-center justify-center mt-5 mb-5 box-border">
      {[1, 2, 3, 4].map((item) => (
        <Skeleton
          key={item}
          variant="rectangular"
          height={100}
          sx={{ bgcolor: "#1E2139", width: "80%", borderRadius: "1em" }}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
