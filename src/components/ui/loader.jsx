export default function Loader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#2b5876] flex items-center justify-center text-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin" />
        <h2 className="text-xl font-semibold animate-pulse">{text}</h2>
      </div>
    </div>
  );
}
