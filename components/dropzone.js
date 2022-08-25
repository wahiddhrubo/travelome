import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div
      className={`dropzone-div w-full p-[80px] border-dashed  border-2 border-orange-400 ${
        isDragActive ? "bg-orange-200" : "bg-orange-100"
      }`}
      {...getRootProps()}
    >
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">Drag & drop some files here</p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
