import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="fixed top-[50%] right-[50%] z-[99999] ">
      <LoadingSpinner color="[#ed1c24]" />
    </div>
  );
}
