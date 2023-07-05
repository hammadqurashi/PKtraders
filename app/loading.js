import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center z-[99999] ">
      <LoadingSpinner color="red" size={50} thickness="4" />
    </div>
  );
}
